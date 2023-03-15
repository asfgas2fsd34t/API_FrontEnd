<template>

  <h2>接口管理</h2>
    <el-card class="index-container">
      <template #header>
        <div class="header">
          <el-button size="small" type="info" :icon="Plus" @click="handleAdd">增加</el-button>
          <el-popconfirm
              title="确定删除吗？"
              confirmButtonText='确定'
              cancelButtonText='取消'
              @confirm="handleDelete"
          >
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete">批量删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <el-table
          :load="state.loading"
          ref="multipleTable"
          :data="state.tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="接口名称" prop="name">
        </el-table-column>
        <el-table-column label="接口说明" prop="description"/>
        <el-table-column label="接口方法" prop="method"/>
        <el-table-column label="url" prop="url"/>
        <el-table-column label="请求参数" prop="requestParams"/>
        <el-table-column label="请求头" prop="requestHeader"/>
        <el-table-column label="响应头" prop="responseHeader"/>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="change($event,scope.row)"
            />
          </template>

        </el-table-column>

        <el-table-column
            label="操作"
            width="100"
        >
          <template #default="scope">
            <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.id)">修改</a>
            <el-popconfirm
                title="确定删除吗？"
                confirmButtonText='确定'
                cancelButtonText='取消'
                @confirm="handleDeleteOne(scope.row)"
            >
              <template #reference>
                <a style="cursor: pointer">删除</a>
              </template>
            </el-popconfirm>
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
  <AddInterface ref='addGood' :reload="getInterfaceList" :type="state.type" />

</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import {apiGetInterfaceList,apiBatchDeleteInterfaceInfo,apiDeleteInterfaceInfo,apiUpdateInterfaceInfo} from "../apis/api";
import AddInterface from '../components/DialogInterface.vue'

const router = useRouter()
const multipleTable = ref(null)
const addGood = ref(null)

const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add', // 操作类型
})

// 初始化
onMounted(() => {
  getInterfaceList()
})

// 首页热销商品列表
const getInterfaceList = () => {
  state.loading = true
  const param={
    current:state.currentPage,
    pageSize:state.pageSize
  }
  apiGetInterfaceList(param).then((res) => {
    state.tableData = res.data.records
    state.total = res.data.total
    state.loading=false
  })
}
function change(val,row){
  console.log(val,row)
  apiUpdateInterfaceInfo(row).then((res)=>{
    if(val===1)
    ElMessage.success("上线成功")
    else ElMessage.success("下线成功")
  })
}
// 添加商品
const handleAdd = () => {
  // console.log("adda")
  state.type = 'add'
  addGood.value.open()
}
// 修改商品
const handleEdit = (id) => {
  state.type = 'edit'
  addGood.value.open(id)
}
// 选择项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// 删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  apiBatchDeleteInterfaceInfo(state.multipleSelection.map(i => i.id)).then(()=>{
    ElMessage.success("批量删除成功")
    getInterfaceList()
  })
}
// 单个删除
const handleDeleteOne = (row) => {
  const param={
    id:row.id
  }
  apiDeleteInterfaceInfo(param).then((res)=>{
    ElMessage.success("删除成功")
    getInterfaceList()
  })
}
const changePage = (val) => {
  state.currentPage = val
  getInterfaceList()
}
</script>

<style scoped>
.index-container {
  min-height: 80%;
}

</style>
