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
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
                    @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = !addUserDialogVisible">添加用户</el-button>
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

      <!--   分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 50]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!--  添加用户的对话框  -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible" width="30%" center @close="addDialogClosed">

      <el-form label-width="80px" :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created () {
      this.getUserList()
    },
    data () {
      // 验证邮箱的规则
      var checkEmail = (rule, value, cb) => {
        const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/

        if (regEmail.test(value)) {
          return cb()
        }

        cb(new Error('请输入合法的邮箱'))
      }

      // 验证手机号的规则
      var checkMobile = (rule, value, cb) => {
        const regEmail = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/

        if (regEmail.test(value)) {
          return cb()
        }

        cb(new Error('请输入合法的手机号'))
      }
      return {
        addUserDialogVisible: false,
        // 查询用户列表参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 5
        },
        userlist: [],
        total: 0,
        addForm: {},
        addFormRules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入登陆密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入登陆密码',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              message: '请输入登陆密码',
              trigger: 'blur'
            },
            {
              validator: checkMobile,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // getUserList 获取用户列表
      async getUserList () {
        const { data: res } = await this.$http.get('users', { params: this.queryInfo })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        }

        this.userlist = res.data.users
        this.total = res.data.total
      },
      // handleSizeChange 监听 pagesize 改变的事件
      handleSizeChange (val) {
        this.queryInfo.pagesize = val
        this.getUserList()
      },
      // handleCurrentChange 监听 页码值 改变的事件
      handleCurrentChange (val) {
        this.queryInfo.pagenum = val
        this.getUserList()
      },
      // userStateChange 监听用户状态的改变
      async userStateChange (userInfo) {
        const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('更新用户状态成功!')
      },
      // addDialogClosed 监听对话空的关闭事件
      addDialogClosed () {
        this.$refs.addFormRef.resetFields()
      },
      // addUser 添加用户
      addUser () {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return

          const { data: res } = await this.$http.post('users', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.msg)
          }

          this.$message.success('添加用户成功！')
          // 关闭对话框
          this.addUserDialogVisible = false
          // 添加用户后刷新列表
          this.getUserList()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-pagination {
    margin-top: 15px;
  }
</style>
