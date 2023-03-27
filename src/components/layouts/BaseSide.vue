<template>
    <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item>
          <h2 style="color: #79bbff;left: 40px">空梦API平台</h2>
      </el-menu-item>
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>主页</span>
      </el-menu-item>
      <div v-if="show">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>管理页</span>

          </template>
          <el-menu-item index="/manager">
            接口管理
          </el-menu-item>
          <el-menu-item index="/userManager">
            用户管理
          </el-menu-item>
          <el-menu-item index="/analysis" >
            接口分析
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
</template>

<script lang="ts" setup>
// @ts-ignore
let user= JSON.parse(localStorage.getItem('userInfo'))
const show= user?.userRole==="admin"||user?.userRole==="test"
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}
</script>
<style>
.el-menu-vertical-demo{
  min-width: 300px;
  height: 100%;
}

</style>
