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
        <el-form
                 :model="loginForm"
                 class="login-form"
                 :rules="rules"
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
            >
              <template #prefix>
                <i-ep-user-filled></i-ep-user-filled>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                ref="password"
                v-model="loginForm.password"
                placeholder="密码"
                name="password"
                tabindex="2"
                @keyup.enter.native="handleLogin"
            >
              <template #prefix>
                <i-ep-lock></i-ep-lock>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
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
<script setup>
  import {login} from "@/api/login";
  import router from "@/router";

  const loginForm = reactive({
    username: '',
    password: ''
  })
  const rules = reactive({
    username: [{required: true, message: '用户名不得为空!'}],
    password: [{required: true, message: '密码不得为空!'}],
  })

  function handleLogin(){
    login({
      name: loginForm.username,
      password: loginForm.password}).then(res =>{
        if (res.status === 200) {
          let data = res.data.data
          localStorage.setItem("token", data['token'])
          console.log("set token: " + data['token'])
          ElMessage({
            message: "登录成功!即将前往主界面",
            type:'success',
            onClose: ()=>{
              router.push("/main")
            }
          })
        }
    }).catch(err =>{
      ElMessage({
        message: "登录失败",
        type: 'error'
      })
      console.log(err)
    })
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