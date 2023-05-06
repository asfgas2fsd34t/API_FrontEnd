<template>

  <el-dialog
      title="购买接口调用次数"
      v-model="state.visible"
      width="400px"
      :show-close="false"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" >
      <el-form-item  label="接口名称" prop="interfaceName">
        {{state.ruleForm.interfaceName}}
      </el-form-item>
      <el-form-item label="购买次数" prop="plusCount">
        <el-input maxlength="9" v-model.number="state.ruleForm.plusCount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="单价" prop="signalAmount">
        <div>{{state.ruleForm.signalAmount}}元/条</div>
      </el-form-item>
      <el-form-item label="总价" prop="totalAmount">
        <div>{{ parseFloat(0.1*state.ruleForm.plusCount).toFixed(2)}}元</div>
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

import {reactive, ref} from "vue";
import {apiIOrderCreate} from "../apis/api";
import {ElMessage} from "element-plus";

const formRef = ref(null)
const state = reactive({
  visible: false,
  ruleForm: {
    id:'',
    signalAmount:0.1,
    interfaceName:'',
    plusCount:10,
    totalAmount:0
  },
  rules: {
    plusCount: [
      { required: 'true', message: '次数不能为空', trigger: ['blur'] },
    ],
  },
})

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const params={
        id:state.ruleForm.id,
        plusCount:state.ruleForm.plusCount,
        signalAmount:state.ruleForm.signalAmount
      }
        apiIOrderCreate(params).then((res)=>{
            alert(res.data)
        })
    }
  })
}

// 开启弹窗
const open = (interfaceName,id) => {
  state.ruleForm.interfaceName=interfaceName
  state.ruleForm.id=id
  state.visible = true
}
// 关闭弹窗
const close = () => {
  state.visible = false
  formRef.value.resetFields()
}
defineExpose({ open, close })


</script>

<style scoped>

</style>
