<template>
  <el-container class="home-container">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002233;
  }
  .el-header {
    border-bottom: 1px #ccc solid;
  }
}
</style>
