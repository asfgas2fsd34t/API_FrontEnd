<template>
  <h2>我的订单</h2>
  <el-card class="index-container">
    <el-table
        :load="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
    >
      <el-table-column label="接口名称" prop="interfaceName"/>
      <el-table-column label="购买次数" prop="buyCount"/>
      <el-table-column label="总价" prop="totalAmount"/>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="订单状态" prop="status"/>
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
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {apiIOrderList} from "../apis/api";

const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
})

const list =()=>{
  const params={
    current:state.currentPage,
    pageSize:state.pageSize
  }
  apiIOrderList(params).then((res)=>{
    state.tableData = res.data.records
    state.total = res.data.total
  })
}

onMounted(()=>{
  list()
})
</script>

<style scoped>
.index-container {
  min-height: 80%;
}
</style>
