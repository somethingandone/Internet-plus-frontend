<template>
  <section>
    <div class="color"></div>

    <div class="color"></div>

    <div class="color"></div>

    <div class="box">

      <div class="square" style="--i:0;"></div>

      <div class="square" style="--i:1;"></div>

      <div class="square" style="--i:2;"></div>

      <div class="square" style="--i:3;"></div>

      <div class="square" style="--i:4;"></div>

      <div class="login-container">
        <el-form ref="loginForm"
                 :model="loginForm"
                 :rules="loginRules"
                 class="login-form"
                 label-position="left">
          <div class="title-container">
            <h3 class="title">欢迎使用</h3>
          </div>

          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            >
              <template #prefix>
                <i-ep-user-filled></i-ep-user-filled>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.enter.native="handleLogin"
            >
              <template #prefix>
                <i-ep-lock></i-ep-lock>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
                :loading="loading"
                type="primary"
                class="el-button"
                @click.native.prevent="handleLogin"
            >登录</el-button>
          </el-form-item>

          <el-form-item class="tips">
            <router-link to="register">还没有账号？立即注册</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
  import {login} from "@/api/login";
  import router from "@/router";
  export default {
    name: 'Login',
    data(){
      return{
        loginForm:{
          username: '',
          password: ''
        },
        loginRules:{
          username: [{
            type: 'string', required: true, trigger: 'blur', message: '请输入用户名'
          }],
          password: [{
            required: true,
            message: '密码',
            trigger: 'blur'
          },{
            pattern :  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: '密码必须同时包含数字与字母,且长度为 8-20位'
          }]
        },
        loading: false,
        passwordType: 'password'
      }
    },
    methods:{
      handleLogin(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            login(this.loginForm).then((data) => {
              this.$message({
                showClose: true,
                type: "success",
                message: '成功'
              })
              let token = data.request.token
              let username = data.request.username
              this.$store.dispatch('Login', token)
              this.$store.dispatch('UserName', username)
              router.push('/home')
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      }
    }
  }
</script>
<style scoped>

@import "../../src/css/sign_in_up.css";

.login-container {
  position: relative;
  width:400px;
  min-height: 400px;
  background:rgb(255,255,255,0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgb(0,0,0,0.1);
  border: 1px solid rgb(255,255,255,0.5);
  border-right: 1px solid rgb(255,255,255,0.2);
  border-bottom: 1px solid rgb(255,255,255,0.2);
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 40px;
}
.tips {
  float: right;
  color: rgb(24, 144, 255);
}
a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}

.el-button {
  width: 100%;
}
body{
  margin: 0 !important;
  overflow: hidden;
}
</style>