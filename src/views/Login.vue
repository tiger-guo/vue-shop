<template>
  <div class="login_container">
    <div class="login_box">
      <!--   登陆 login   -->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt="">
      </div>

      <!--   登陆表单   -->
      <el-form class="login_form" :model="loginForm">
        <el-form-item>
          <el-input prefix-icon="iconfont icon-yonghu" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" prefix-icon="iconfont icon-mima" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary">登陆</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 登陆表单数据绑定对象
        loginForm: {
          userName: '',
          password: '',
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
    background: @background-color;

    .login_box {
      width: 450px;
      height: 300px;
      background-color: @white-color;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid @gray-color;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: @white-color;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: @gray-color;
        }
      }

      .login_form {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;

        .btns {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
