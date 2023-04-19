<template>

  <h2>用户管理</h2>
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
      <el-table-column label="用户名称" prop="userName">
      </el-table-column>
      <el-table-column label="用户账号" prop="userAccount"/>
      <el-table-column label="用户角色" prop="userRole"/>
      <el-table-column label="创建时间" prop="createTime"/>


      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope" >
          <el-popover
              placement="bottom"
              :width="200"
              trigger="click"
          >
            <div>
              <el-button size="small" class="m-2" @click="openUserInterface(scope.row.id)">增加接口调用次数</el-button>
            </div>
            <template #reference>
              <a style="cursor: pointer">管理</a>
            </template>
          </el-popover>
          <div v-if="scope.row.userRole!=='admin'">
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
          </div>

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
  <DialogUser ref='addGood' :reload="getUserList" :type="state.type" />
  <DialogUserInterface ref="userInterface"/>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import {apiUserList,apiDeleteUser,apiDeleteBatchUser} from "../apis/api";
import DialogUser from "../components/DialogUser.vue"
import DialogUserInterface from "../components/DialogUserInterface.vue";

const router = useRouter()
const multipleTable = ref(null)
const addGood = ref(null)
const userInterface=ref(null)

const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 5, // 分页大小
})

// 初始化
onMounted(() => {
  getUserList()
})

const openUserInterface=(id)=>{
  userInterface.value.open(id)
}
// 用户列表
const getUserList = () => {
  state.loading = true
  const param={
    current:state.currentPage,
    pageSize:state.pageSize
  }
  apiUserList(param).then((res) => {
    console.log(res)
    state.tableData = res.data.records
    state.total = res.data.total
    state.loading=false
  })
}

const handleAdd = () => {
  // console.log("adda")
  // state.type = 'add'
  addGood.value.open()
}

// // 选择项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// // 删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  apiDeleteBatchUser(state.multipleSelection.map(i => i.id)).then(()=>{
    ElMessage.success("批量删除成功")
    getUserList()
  })
}
// // 单个删除
const handleDeleteOne = (row) => {
  const param={
    id:row.id
  }
  apiDeleteUser(param).then((res)=>{
    ElMessage.success("删除成功")
    getUserList()
  })
}
const changePage = (val) => {
  state.currentPage = val
  getUserList()
}
</script>

<style scoped>
.index-container {
  min-height: 80%;
}

</style>
