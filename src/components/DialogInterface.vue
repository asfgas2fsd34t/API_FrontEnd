<template>

  <el-dialog
      :title="type === 'add' ? '添加接口' : '修改接口'"
      v-model="state.visible"
      width="400px"
      :show-close="false"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="接口名称" prop="name">
        <el-input type="text" v-model="state.ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="接口描述" prop="description">
        <el-input type="text" v-model="state.ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-input type="text" v-model="state.ruleForm.method"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input type="text" min="0" v-model="state.ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="请求参数" prop="requestParams">
        <el-input type="textarea" v-model="state.ruleForm.requestParams"></el-input>
      </el-form-item>
      <el-form-item label="请求头" prop="requestHeader">
        <el-input type="textarea" v-model="state.ruleForm.requestHeader"></el-input>
      </el-form-item>
      <el-form-item label="响应头" prop="responseHeader">
        <el-input type="textarea" v-model="state.ruleForm.responseHeader"></el-input>
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
import {apiGetInterfaceInfo,apiAddInterfaceInfo,apiUpdateInterfaceInfo} from "../apis/api";

const props = defineProps({
  type: String,
  configType: Number,
  reload: Function
})
const formRef = ref(null)
const state = reactive({
  visible: false,
  ruleForm: {
    name: '',
    description: '',
    url: '',
    requestParams: '',
    requestHeader:'',
    responseHeader:'',
    method:''
  },
  rules: {
    name: [
      { required: 'true', message: '名称不能为空', trigger: ['blur'] }
    ],
    description: [
      { required: 'true', message: '描述不能为空', trigger: ['blur'] }
    ],
    url: [
      { required: 'true', message: 'url不能为空', trigger: ['blur'] }
    ],
    requestParams: [
      { required: 'true', message: '请求参数不能为空', trigger: ['blur'] }
    ],
    requestHeader: [
      { required: 'true', message: '请求头不能为空', trigger: ['blur'] }
    ],
    responseHeader: [
      { required: 'true', message: '响应头不能为空', trigger: ['blur'] }
    ],
    method: [
      { required: 'true', message: '请求方法不能为空', trigger: ['blur'] }
    ],
  },
  id: ''
})
// 获取详情
const getDetail = () => {
  const param={
    id:state.id
  }
  apiGetInterfaceInfo(param).then((res)=>{
    state.ruleForm={
      name: res.data.name,
      description: res.data.description,
      url: res.data.url,
      requestParams: res.data.requestParams,
      requestHeader:res.data.requestHeader,
      responseHeader:res.data.responseHeader,
      method:res.data.method
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
      name: '',
      description: '',
      url: '',
      requestParams: '',
      requestHeader:'',
      responseHeader:'',
      method:''
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
      if (props.type === 'add') {

        apiAddInterfaceInfo(state.ruleForm).then((res)=>{
            ElMessage.success('添加成功')
            state.visible = false
            if (props.reload) props.reload()
        })
      } else {
        const params={
            id:state.id,
            name:state.ruleForm.name,
            description:state.ruleForm.description,
            url:state.ruleForm.url,
            requestParams:state.ruleForm.requestParams,
            requestHeader:state.ruleForm.requestHeader,
            responseHeader:state.ruleForm.responseHeader,
            method:state.ruleForm.method,
        }
        apiUpdateInterfaceInfo(params).then((res)=>{
          ElMessage.success('修改成功')
          state.visible = false
          if (props.reload) props.reload()
        })
      }
    }
  })
}
defineExpose({ open, close })
</script>

<style scoped>
</style>
