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
      <el-table-column label="总价" prop="totalAmount">
        <template #default="scope">
          {{scope.row.totalAmount}}元
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="订单状态" prop="status">
        <template #default="scope">
            {{scope.row.status===1?"待付款":(scope.row.status===2?"已付款":"已取消")}}
        </template>
      </el-table-column>
<!--      <el-table-column>-->
<!--        <template #default="scope">-->
<!--        <div v-if="scope.row.status===1"  class="time">剩余{{}}分钟 {{}}秒 </div>-->
<!--        </template>-->

<!--      </el-table-column>-->
      <el-table-column
          width="100"
      >
        <template #default="scope">
          <a v-if="scope.row.status===1" style="cursor: pointer; margin-right: 10px" @click="handleBuy(scope.row.id)">前往支付</a>
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
import {computed, onMounted, reactive} from "vue";
import {apiIOrderList,apiIOrderGet} from "../apis/api";

const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
})

// const countdown=(startTime) =>{
//   const end = Date.parse(new Date(startTime).toString())
//   const now = Date.parse(new Date().toString())
//   const msec = end - now
//
//   // console.log(msec)
//   if(msec<0) return;
//
//
//   let min = parseInt(msec / 1000 / 60 % 60)
//   let sec = parseInt(msec / 1000 % 60)
//   min = min > 9 ? min : '0' + min
//   sec = sec > 9 ? sec : '0' + sec
//   if(min>=0 && sec>=0){
//     //倒计时结束关闭订单
//     if(min==0 && sec==0){
//       return
//     }
//     setTimeout(function () {
//       countdown()
//     }, 1000)
//   }
// }
//
// computed(()=>{
//
// })

const handleBuy=(id)=>{
    const params={
      id:id
    }
    apiIOrderGet(params).then((res)=>{
      console.log(res.data)
      window.open("http://localhost:7529/api/alipay/pay?subject="+res.data.interfaceName+"&traceNo="+
          res.data.traceNo+"&totalAmount="+res.data.totalAmount)
    })
}

const list =()=>{
  let user= JSON.parse(localStorage.getItem('userInfo'))
  const params={
    userId:user.id,
    current:state.currentPage,
    pageSize:state.pageSize
  }
  apiIOrderList(params).then((res)=>{
    state.tableData = res.data.records
    state.total = res.data.total
  })
}

const changePage = (val) => {
  state.currentPage = val
  list()
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
