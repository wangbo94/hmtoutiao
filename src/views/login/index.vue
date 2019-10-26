<template>
  <div class="container">
    <!-- login图片 -->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="LoginForm">
        <el-form-item>
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      LoginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang='less'>
.container {
  height: 100%;
  width: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
