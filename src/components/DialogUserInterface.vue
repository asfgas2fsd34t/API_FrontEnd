<template>

  <el-dialog
      title="添加接口调用次数"
      v-model="state.visible"
      width="400px"
      :show-close="false"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" >
      <el-form-item label="增加次数" prop="plusCount">
        <el-input type="number" v-model="state.ruleForm.plusCount" autocomplete="off" />
      </el-form-item>
      <el-form-item  label="接口名称" prop="interFaceInfo">
        <el-select v-model="interFaceId" placeholder="请选择接口名称">
          <el-option
              v-for="item in state.ruleForm.interFaceInfo"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="info" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive,ref} from "vue";
import { apiGetInterfaceListAdmin,apiPlusUserInterfaceInfo} from "../apis/api";
import {ElMessage} from "element-plus";

const formRef = ref(null)
const interFaceId=ref('');
const state = reactive({
  visible: false,
  userId:'',
  ruleForm: {
    plusCount: '',
    interFaceInfo:[]
  },
  rules: {
    plusCount: [
    { required: 'true', message: '次数不能为空', trigger: ['blur'] },
  ],
    interFaceInfo: [
      { required: 'true', message: '接口不能为空', trigger: ['blur'] },
    ],
},
})

const plusUserInterfaceCount=()=>{
  const params={
    userId:state.userId,
    count:state.ruleForm.plusCount,
    interfaceId:interFaceId.value
  }
  apiPlusUserInterfaceInfo(params).then((res)=>{
    console.log(res)
    if(res.code===0){
      ElMessage.success(res.message)
    }else{
      ElMessage.error(res.message)
    }
    close()
  })
}

const listInterface=()=>{
  apiGetInterfaceListAdmin(null).then((res)=>{
    state.ruleForm.interFaceInfo=res.data.records
  })
}
// 开启弹窗
const open = (id) => {
  state.userId=id
  listInterface()
  state.visible = true
}
// 关闭弹窗
const close = () => {
  formRef.value.resetFields()
  state.visible = false
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      plusUserInterfaceCount()
    }
  })
}
defineExpose({ open, close })

</script>

<style scoped>

</style>
