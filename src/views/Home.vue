<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/img/backShopSystem-logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">

        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
          <!--    一级菜单      -->
          <el-submenu index="1" v-for="item in menulist" :key="item.id">
            <!--      一级菜单的模版区域      -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <!--     二级菜单       -->
            <el-menu-item index="1-4" v-for="childItem in item.children" :key="childItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{childItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    created () {
      this.getMenuList()
    },
    data () {
      return {
        menulist: []
      }
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getMenuList () {
        const { data: res } = await this.$http.get('menus')
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.menulist = res.data
        console.log(this.menulist)
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      background-color: @background-color-home-header;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      align-items: center;
      color: @white-color;
      font-size: 20px;

      div {
        display: flex;
        align-items: center;

        span {
          margin-left: 15px;
        }
      }
    }

    .el-aside {
      background-color: @background-color-home-aside;
    }

    .el-main {
      background-color: @background-color-home-main;
    }
  }
</style>
