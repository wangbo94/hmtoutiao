<template>
  <el-container class="home-container">
    <el-aside :width="isOpen?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown :hide-on-click="false" class="dropdown">
          <span class="el-dropdown-link">
            <img class="headIcon" src="../../assets/avatar.jpg" alt />
            <span class="userName">用户名</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return { isOpen: true }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    }
  }
}
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
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px #ccc solid;
    line-height: 60px;
    .el-icon-s-fold {
      vertical-align: middle;
      font-size: 30px;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .dropdown {
      float: right;
      .headIcon {
        height: 30px;
        width: 30px;
        vertical-align: middle;
      }
      .userName {
        margin-left: 5px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
