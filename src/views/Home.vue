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
      <el-aside :width="isCollapes ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
                 :collapse="isCollapes" :collapse-transition="false" :router="true" :default-active="activePath">
          <!--    一级菜单      -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!--      一级菜单的模版区域      -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!--     二级菜单       -->
            <el-menu-item :index="'/' + childItem.path" v-for="childItem in item.children" :key="childItem.id"
                          @click="saveNavState('/' + childItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{childItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    created () {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    data () {
      return {
        // 菜单栏是否折叠
        isCollapes: false,
        // 被激活的链接地址
        activePath: '',
        menulist: [],
        iconsObj: {
          '125': 'iconfont icon-yonghu1',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpingouwudai2',
          '102': 'iconfont icon-danju-tianchong',
          '145': 'iconfont icon-baobiao'
        }
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
      },
      // 点击按钮折叠/展开菜单栏
      toggleCollapse () {
        this.isCollapes = !this.isCollapes
      },
      // 保存链接的激活状态
      saveNavState (activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
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

      .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
      }

      .iconfont {
        margin-right: 10px;
      }

      .el-menu {
        border-right: 0px;
      }
    }

    .el-main {
      background-color: @background-color-home-main;
    }
  }
</style>
