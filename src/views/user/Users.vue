<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图  -->
    <el-card class="box-card">
      <!--   搜索与添加   -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!--   用户列表   -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>

        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="email" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 50]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    created () {
      this.getUserList()
    },
    data () {
      return {
        // 查询用户列表参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 5
        },
        userlist: [],
        total: 0
      }
    },
    methods: {
      async getUserList () {
        const { data: res } = await this.$http.get('users', { params: this.queryInfo })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        }

        this.userlist = res.data.users
        this.total = res.data.total
      },
      // 监听 pagesize 改变的事件
      handleSizeChange (val) {
        this.queryInfo.pagesize = val
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (val) {
        this.queryInfo.pagenum = val
        this.getUserList()
      },
      // 监听用户状态的改变
      async userStateChange (userInfo) {
        const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error("更新用户状态失败")
        }
        this.$message.success("更新用户状态成功!")
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-pagination {
    margin-top: 15px;
  }
</style>
