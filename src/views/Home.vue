<template>
  <h2>在线接口开放平台</h2>
  <div class="main" >
    <el-table :data="filterTableData" style="width: 100%" @row-click="click">
      <el-table-column label="接口名称" prop="name">
      </el-table-column>
      <el-table-column label="接口说明" prop="description"/>
      <el-table-column align="center">
        <template #header>
          <el-input v-model="search" size="large" placeholder="试试搜索接口名称吧"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="state.pageSize"
        :current-page="state.currentPage"
        @current-change="changePage"
    />
  </div>

</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {apiGetInterfaceList} from "~/apis/api";
import {useRouter} from "vue-router";

const search = ref('')
const filterTableData = computed(() =>
    state.tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const state = reactive({
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 14 , // 分页大小
})
function getInterfaceInfo() {
  const param = {
    current:state.currentPage,
    pageSize:state.pageSize
  }
  apiGetInterfaceList(param).then((res: any) => {
    console.log(res.data.records)
    state.tableData = res.data.records
    state.total = res.data.total
    console.log(res.data.total)
  })
}
const changePage = (val: number) => {
  state.currentPage = val
  getInterfaceInfo()
}
const router=useRouter()

function click(row: any){
  router.push(`/interface/${row.id}`)
}

onMounted(() => {
  getInterfaceInfo()
})

</script>
<style>
.main{
  min-height: 80%;
}
.pagination{
  padding-left: 40%;
}
</style>
