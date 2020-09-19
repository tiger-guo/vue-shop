<template>
  <div class="login_container">
    <div class="login_box">
      <!--   登陆 login   -->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt="">
      </div>

      <!--   登陆表单   -->
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-yonghu" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-mima" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
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
          username: 'admin',
          password: '123456',
        },
        // 登陆表单数据验证规则
        loginFormRules: {
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
        },
      }
    },
    methods: {
      // 登陆表单重置功能
      resetLoginForm () {
        this.$refs.loginFormRef.resetFields()
      },
      // login function
      login () {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) {
            return
          }
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log(res)
          if (res.meta.status !== 200) {
            console.log('登陆失败')
          }
        })
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
