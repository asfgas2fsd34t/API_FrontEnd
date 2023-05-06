<template>
  <el-dialog
      title="找回密码"
      v-model="state.visible"
      width="1000px"
      :show-close="false"
  >
    <el-steps  simple :active="active" finish-status="success">
      <el-step title="输入账号" />
      <el-step title="安全验证" />
      <el-step title="修改密码" />
    </el-steps>

    <el-form label-position="top" size="large" style="margin-top: 30px;width: 50%;margin-left: 25%" :model="state.ruleForm" :rules="state.rules" ref="formRef" >
      <el-form-item label="请输入需要找回的账号" prop="phone" v-if="active===0">
        <el-input type="text" placeholder="请输入手机号" v-model="state.ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="请输入验证码" prop="code" v-if="active===1">
        <div style="display: flex;width: 100%" >
          <el-input placeholder="请输入验证码" type="text" v-model.trim="state.ruleForm.code"  autocomplete="off"></el-input>
          <el-button :loading="state.loading" :disabled="state.disabled"
                     @click="getCheckCode" style="margin-left: 5%;width: 30%"> {{ state.text }}</el-button>
        </div>
      </el-form-item>
      <el-form-item label="请输入新密码"  prop="password" v-if="active===2">
        <el-input placeholder="密码" type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请确认密码" prop="checkPassword" v-if="active===2">
        <el-input placeholder="确认密码" type="password" v-model.trim="state.ruleForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-show="active" type="success" style="margin-top: 12px;width: 20%;" @click="back">上一步</el-button>
    <el-button type="success" style="margin-top: 12px;width: 20%;margin-left: 60%" @click="next">下一步</el-button>
  </el-dialog>

</template>

<script setup>
import {nextTick, reactive, ref} from 'vue'
import {apiGetCode,apiCheckPhone,apiRePassword} from "../apis/api";
import {ElMessage} from "element-plus";

const active = ref(0)
const state=reactive({
  disable:false,
  loading:false,
  duration:60,
  timer:null,
  text:'获取验证码',
  visible: false,
  ruleForm:{
    phone:'',
    code:'',
    password:'',
    checkPassword:''
  },
  rules: {
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
      { required: 'true', message: '验证码不能为空', trigger: 'blur' },
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' },
    ],
    checkPassword: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' },
    ]
  }

})
// const formRef=ref(null)

const formRef = ref(null);

const back=()=>{
  active.value--
}

const next = () => {
  console.log(active.value)

  if(active.value===1){
    const params={
      phone:state.ruleForm.phone,
      code:state.ruleForm.code
    }
    apiCheckPhone(params).then((res)=>{
      if(res.code===0){
        active.value++
      }else{
        ElMessage.error(res.message)
      }
    })
  }else if(active.value===2){
    const params={
      phone:state.ruleForm.phone,
      password:state.ruleForm.password,
      checkPassword:state.ruleForm.checkPassword
    }
    apiRePassword(params).then((res)=>{
      if(res.code===0){
        ElMessage.success("修改密码成功")
        close()
      }else{
        ElMessage.error(res.message)
      }
    })
  }else if(active.value===3){
    close()
  }else{
    active.value++
  }
  // if (active.value++ >= 2) close()
}
// 开启弹窗
const open = () => {
  active.value=0
  nextTick(() => {
    formRef.value.resetFields(); // 清空表单
  });
  state.visible = true
}
// 关闭弹窗
const close = () => {

  state.visible = false
}
const getCheckCode = () => {
  // 倒计时期间按钮不能单击
  // if (state.duration !== 60) {
    state.disabled = true
  // }
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

defineExpose({ open, close })

</script>

<style scoped>

</style>
