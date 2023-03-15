<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>

</script>
<style scoped>
.app-main {
  /*50 = navbar*/
  min-height: calc(100vh);
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: left;
  margin-left: 320px;
}
/*.fixed-header+.app-main {*/
/*  padding-top: 50px;*/
/*}*/
</style>
