<template>

  <el-dialog
      title="添加用户"
      v-model="state.visible"
      width="400px"
      :show-close="false"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="用户昵称" prop="userName">
        <el-input type="text" v-model="state.ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input type="text" v-model="state.ruleForm.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="userAvatar">
        <el-input type="text" v-model="state.ruleForm.userAvatar"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input type="text" min="0" v-model="state.ruleForm.gender"></el-input>
      </el-form-item>
      <el-form-item label="用户角色: user, admin" prop="userRole">
        <el-input type="textarea" v-model="state.ruleForm.userRole"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="textarea" v-model="state.ruleForm.userPassword"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(formRef)">取 消</el-button>
        <el-button type="info" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {apiGetUser,apiAddUser} from "../apis/api";

const props = defineProps({
  type: String,
  configType: Number,
  reload: Function
})
const formRef = ref(null)
const state = reactive({
  visible: false,
  ruleForm: {
    userName: '',
    userAccount: '',
    userAvatar: '',
    gender: '',
    userRole:'',
    userPassword:'',
  },
  rules: {
    userName: [
      { required: 'true', message: '昵称不能为空', trigger: ['blur'] }
    ],
    userAccount: [
      { required: 'true', message: '账号不能为空', trigger: ['blur'] }
    ],

    gender: [
      { required: 'true', message: '性别不能为空', trigger: ['blur'] }
    ],
    userRole: [
      { required: 'true', message: '用户角色不能为空', trigger: ['blur'] }
    ],
    userPassword: [
      { required: 'true', message: '用户密码不能为空', trigger: ['blur'] }
    ],
  },
  id: ''
})
// 获取详情
const getDetail = () => {
  const param={
    id:state.id
  }
  apiGetUser(param).then((res)=>{
    state.ruleForm={
      userName: res.data.userName,
      userAccount: res.data.userAccount,
      userAvatar: res.data.userAvatar,
      gender: res.data.gender,
      userRole:res.data.userRole,
    }
  })
}
// 开启弹窗
const open = (id) => {
  state.visible = true
  if (id) {
    state.id = id
    getDetail()
  } else {
    state.ruleForm = {
      userName: '',
      userAccount: '',
      userAvatar: '',
      gender: '',
      userRole:'',
      userPassword:'',
    }
  }
}
// 关闭弹窗
const close = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  state.visible = false
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      apiAddUser(state.ruleForm).then((res)=>{
        ElMessage.success('添加成功')
        state.visible = false
        if (props.reload) props.reload()
      })

    }
  })
}
defineExpose({ open, close })
</script>

<style scoped>
</style>
