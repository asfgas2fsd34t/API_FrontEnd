<template>
<h2>查看接口文档</h2>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{interfaceInfo.data.name}}</span>
      </div>
    </template>
    <div class="text item">接口状态: {{interfaceInfo.data.status===1?"开启":"关闭"}}</div>
    <div class="text item">描述：{{interfaceInfo.data.description}}</div>
    <div class="text item">请求地址: {{interfaceInfo.data.url}}</div>
    <div class="text item">请求方法: {{interfaceInfo.data.method}}</div>
    <div class="text item">请求参数: {{interfaceInfo.data.requestParams}}</div>
    <div class="text item">请求头: {{interfaceInfo.data.requestHeader}}</div>
    <div class="text item">响应头: {{interfaceInfo.data.responseHeader}}</div>
    <div class="text item">创建时间: {{interfaceInfo.data.createTime}}</div>
    <div class="text item">更新时间: {{interfaceInfo.data.updateTime}}</div>
  </el-card>
  <el-divider />
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>在线测试</span>
      </div>
    </template>
    <div class="text item">请求参数</div>
    <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
    <el-button type="info" size="default" style="margin-top: 30px" @click="invoke">调用</el-button>
  </el-card>
  <el-divider />

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>返回结果</span>
      </div>
    </template>
    <el-input
        v-model="result"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
  </el-card>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {apiGetInterfaceInfo,apiInvokeInterface} from "../apis/api";
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

const interfaceInfo=reactive({
    data:''
})
const router=useRouter()
const textarea = ref('')
const result=ref('')
function getInterfaceInfo(){
  const params={
    id:router.currentRoute.value.params.id
  }
  apiGetInterfaceInfo(params).then((res)=>{
   if(res.data===null){
      window.location.href='/errors'
    }else{
     interfaceInfo.data=res.data
     textarea.value=interfaceInfo.data.requestParams
   }

  })
}

function invoke(){
  const params={
    id:router.currentRoute.value.params.id,
    userRequestParams:textarea.value
  }
  apiInvokeInterface(params).then((res)=>{
      result.value=res.data
  })
}
onMounted(()=>{
  getInterfaceInfo()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 95%;
}

</style>
