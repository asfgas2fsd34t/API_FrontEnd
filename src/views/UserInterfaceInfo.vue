<template>
  <h2>接口调用详情</h2>
  <el-card class="index-container">
    <el-table
        :load="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
       >
      <el-table-column label="用户名称" prop="userName"/>
      <el-table-column label="接口名称" prop="interfaceInfoName"/>
      <el-table-column label="接口描述" prop="description"/>
      <el-table-column label="总调用次数" prop="totalNum"/>
      <el-table-column label="剩余调用次数" prop="leftNum"/>
      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.interfaceInfoName,scope.row.id)">购买次数</a>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
  </el-card>
  <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
      style="padding-left: 40%;margin-top: 20px;margin-bottom: 20px"
  />
  <DialogOrder ref="order"></DialogOrder>
</template>

<script setup>
import {onMounted, reactive,ref} from "vue";
import {apiUserInterfaceInfoList} from "../apis/api";
import DialogOrder from "../components/DialogOrder.vue"

const order=ref(null)
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
})
let user= JSON.parse(localStorage.getItem('userInfo'))

const getUserInterfaceInfoList = ()=>{
    const params={
      current:state.currentPage,
      pageSize:state.pageSize,
      userId:user.id
    }
    apiUserInterfaceInfoList(params).then((res)=>{
      console.log(res.data)
      state.tableData = res.data.records
      state.total = res.data.total
    })
}
const changePage = (val) => {
  state.currentPage = val
  getUserInterfaceInfoList()
}
onMounted(() => {
  getUserInterfaceInfoList()
})

const handleEdit= (interfaceInfoName,id)=>{
  order.value.open(interfaceInfoName,id)


}

</script>

<style scoped>
.index-container {
  min-height: 80%;
}
</style>
