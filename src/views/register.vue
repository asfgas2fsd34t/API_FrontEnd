<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">空梦API平台</div>
        </div>
      </div>
      <el-form size="large" label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
        <el-form-item prop="username">
          <el-input  placeholder="账号" type="text" v-model.trim="state.ruleForm.username" autocomplete="off">
            <template #prefix>
                <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input placeholder="密码" type="password" v-model.trim="state.ruleForm.password" autocomplete="off">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input placeholder="确认密码" type="password" v-model.trim="state.ruleForm.checkPassword" autocomplete="off">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="手机号" type="text"  autocomplete="off">
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex">
            <el-input placeholder="请输入验证码" type="text"  autocomplete="off">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
            <el-button style="margin-left: 5%;width: 30%">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="register">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {apiUserRegister} from "../apis/api";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {
  User,
  Lock,
  Iphone
} from '@element-plus/icons-vue'

const router=useRouter()
const loginForm = ref(null)
const state = reactive({
  ruleForm: {
    username: '',
    password: '',
    checkPassword:''
  },
  checked: true,
  rules: {
    username: [
      { required: 'true', message: '账户不能为空', trigger: 'blur' }
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ],
    checkPassword: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ]
  }
})
const register = async () => {
  loginForm.value.validate((valid) => {
    if (valid && state.ruleForm.password===state.ruleForm.checkPassword) {
      const params={
        userAccount:state.ruleForm.username,
        userPassword:state.ruleForm.password,
        checkPassword:state.ruleForm.checkPassword
      }
      apiUserRegister(params).then((res)=>{
        if(res.code===0){
          ElMessage.success("注册成功")
          window.location.href='/login'
        }else{
          ElMessage.error(res.message)
        }
      })
    } else {
      if(state.ruleForm.password!==state.ruleForm.checkPassword){
        ElMessage.error('密码输入不一致')
      }else{
        ElMessage.error('格式错误，请重新输入')
      }
      return false;
    }
  })
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.login-container {
  width: 420px;
  height: 600px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1BAEAE;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form >>> .el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form >>> .el-form-item {
  margin-bottom: 0;
}
</style>
