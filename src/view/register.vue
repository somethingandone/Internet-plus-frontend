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

      <div class="register-container">
        <el-form
          :model="ruleForm"
          class="register-form"
          :rules="rules"
          label-position="left">

          <div class="title-container">
            <h3 class="title">欢迎注册</h3>
          </div>

          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              ref="username"
              placeholder="用户名"
              type="text"
              name="username"
              tabindex="1"
            >
              <template #prefix>
                <i-ep-user-filled></i-ep-user-filled>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              name="password"
              placeholder="密码"
              tabindex="2"
            >
              <template #prefix>
                <i-ep-lock></i-ep-lock>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="cPassword">
            <el-input
              v-model="ruleForm.cPassword"
              type="password"
              placeholder="确认密码"
              tabindex="3"
              name="cPassword"
            >
              <template #prefix>
                <i-ep-lock></i-ep-lock>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="handleRegister"
              class="el-button"
            >注册</el-button>
          </el-form-item>

          <el-form-item class="tips">
            <router-link to="/">已有账号？立即登录</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script setup>

import {register} from "@/api/login";
import router from "@/router";
import {ElMessage} from "element-plus";

const ruleForm = reactive({
  username: '',
  password: '',
  cPassword: ''
})

const validateConfirm = (rule, value, callback)=>{
  if (ruleForm.cPassword === '') {
    callback(new Error('Please input the password again'))
  } else if (ruleForm.cPassword!== ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{required: true, message: '用户名不得为空!'}],
  password: [{required: true, message: '密码不得为空!'}],
  confirm: [{validator:validateConfirm, message: '两次输入密码不一致!'}]
})

function handleRegister(){
  register({
    name: ruleForm.username,
    password: ruleForm.password
  }).then(res => {
    if (res.status === 200){
      ElMessage({
        message:"注册完成，返回登录",
        type: "success",
        onClose: () =>{router.push('/')}
      })
    }
  }).catch(err => {
    ElMessage({
      message:"注册失败",
      type:"error"
    })
    console.log(err)
  })
}

</script>

<style scoped>

@import "../../src/css/sign_in_up.css";

.register-container {
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
.register-form {
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
</style>