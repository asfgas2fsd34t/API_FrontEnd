<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">空梦API平台</div>
        </div>
      </div>
      <el-form size="large" label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
        <div style="display: flex">
          <el-link @click="formType()" style="width: 50%;" :underline="false">账号密码登录</el-link>
          <el-link @click="phoneType()" style="width: 50%;"  :underline="false">手机号登录</el-link>
        </div>
        <el-divider />
        <div v-if="state.type==='userForm'">
          <el-form-item prop="username">
            <el-input placeholder="账号" type="text" v-model.trim="state.ruleForm.username" autocomplete="off">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model.trim="state.ruleForm.password" autocomplete="off">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="width: 50%">
              <el-link @click="register"  type="primary"  :underline="false">立即注册</el-link>
            </div>
            <div style="margin-left: 28%">
              <el-link  type="primary" @click="forget" :underline="false">忘记密码?</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
            <el-button style="width: 100%" type="success" @click="submitForm">立即登录</el-button>
          </el-form-item>
        </div>
        <div v-if="state.type==='phone'">
          <el-form-item prop="phone">
            <el-input placeholder="手机号" type="text" v-model.trim="state.ruleForm.phone" autocomplete="off">
              <template #prefix>
                <el-icon><Iphone /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input placeholder="请输入验证码" type="text" v-model.trim="state.ruleForm.code"  autocomplete="off">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
              <el-button :loading="state.loading" :disabled="state.disabled"
                         @click="getCheckCode" style="margin-left: 5%;width: 30%"> {{ state.text }}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="width: 50%">
              <el-link @click="register"  type="primary"  :underline="false">立即注册</el-link>
            </div>
            <div style="margin-left: 28%">
              <el-link  type="primary" @click="forget" :underline="false">忘记密码?</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
            <el-button style="width: 100%" type="success" @click="submitForm">立即登录</el-button>
          </el-form-item>
        </div>
        <div v-if="state.type==='register'">
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
            <el-input placeholder="手机号" type="text" v-model.trim="state.ruleForm.phone"   autocomplete="off">
              <template #prefix>
                <el-icon><Iphone /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input placeholder="请输入验证码" type="text" v-model.trim="state.ruleForm.code"  autocomplete="off">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
              <el-button :loading="state.loading" :disabled="state.disabled"
                         @click="getCheckCode" style="margin-left: 5%;width: 30%">{{ state.text }}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="success" @click="registerSubmit">立即注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

  <DialogForgetStep ref="forgetStep"></DialogForgetStep>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {apiUserLogin, apiGetCode, apiUserRegister} from "../apis/api";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {
  User,
  Lock,
  Iphone
} from '@element-plus/icons-vue'
import DialogForgetStep from "../components/DialogForgetStep.vue";

const forgetStep=ref(null)
const router=useRouter()
const loginForm = ref(null)
const state = reactive({
  disable:false,
  loading:false,
  duration:60,
  timer:null,
  text:'获取验证码',
  type:'userForm',
  ruleForm: {
    username: '',
    password: '',
    checkPassword:'',
    phone:'',
    code:'',

  },
  checked: true,
  rules: {
    username: [
      { required: 'true', message: '账户不能为空', trigger: 'blur' }
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ],
    phone: [
      { required: 'true', message: '手机号不能为空', trigger: 'blur' },
      { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
      {
        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        //pattern: /^1[3456789]\d{9}$/,
        message: "请输入正确的手机号码",
      },
    ],
    code: [
      { required: 'true', message: '验证码不能为空', trigger: 'blur' }
    ]
  }
})

const formType=()=>{
    loginForm.value.resetFields();
    state.type='userForm'
}
const phoneType=()=>{
  loginForm.value.resetFields();
  state.type='phone'
}

const forget =()=>{
  forgetStep.value.open()
}
const getCheckCode = () => {
  // 倒计时期间按钮不能单击
  if (state.duration !== 60) {
    state.disabled = true
  }
  // 清除掉定时器
  state.timer && clearInterval(state.timer)
  // 开启定时器
  state.timer = setInterval(() => {
    const tmp = state.duration--
    state.text = `${tmp}秒`
    if (tmp <= 0) {
      // 清除掉定时器
      clearInterval(state.timer)
      state.duration = 60
      state.text = '重新获取'
      // 设置按钮可以单击
      state.disabled = false
    }
  }, 1000)

  const params={
    phone:state.ruleForm.phone
  }
  apiGetCode(params).then((res)=>{
    if(res.code===0){
      ElMessage.success("发送成功")
    }else{
      ElMessage.error(res.message)
    }
  })
}

const submitForm = async () => {
  loginForm.value.validate((valid) => {
    if (valid) {
        const params={
          userAccount:state.ruleForm.username,
          userPassword:state.ruleForm.password,
          phone:state.ruleForm.phone,
          code:state.ruleForm.code,
        }
        apiUserLogin(params).then((res)=>{
          if(res.code===0){
            localStorage.setItem("userInfo",JSON.stringify(res.data))
            if(router.currentRoute.value.query.redirect===undefined){
              window.location.href='/'
            }else{
              window.location.href=router.currentRoute.value.query.redirect
            }
          }else{
            ElMessage.error(res.message)
          }
        })
    } else {
      ElMessage.error('格式错误，请重新输入')
      return false;
    }
  })
}
const register=async ()=>{
  state.type='register'
  // window.location.href='/register'
}

const registerSubmit=()=>{
  loginForm.value.validate((valid) => {
    if (valid && state.ruleForm.password===state.ruleForm.checkPassword) {
      const params={
        userAccount:state.ruleForm.username,
        userPassword:state.ruleForm.password,
        checkPassword:state.ruleForm.checkPassword,
        phone:state.ruleForm.phone,
        code:state.ruleForm.code,
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
  height: 550px;
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
