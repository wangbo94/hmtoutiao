<template>
  <div class="container">
    <!-- login图片 -->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="LoginForm" :rules="LoginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:230px;margin-right:15px"
          ></el-input>
          <el-button type="success">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
  </div>
</template>
<!---
//步骤：添加效验，手机号和验证码，查看element-ui文档，通过---》表单验证以及自定义效验
Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
自定义校验 callback 必须被调用

登录模块-整体校验
- el-form组件提供函数  validate
  - 传参：回调函数（valid）
  - valid 如果为true 校验成功  否则失败
- 获取el-form组件的实例
  - 加属性 ref="abc"
  - 获取 this.$refs['abc']
---->
<script>
// import { log } from 'util';
export default {
  data () {
    // 校验手机号函数
    const checkMobile = (rule, value, callback) => {
      // 判断value是否符合手机号格式
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      LoginForm: {
        mobile: '',
        code: ''
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 校验成功  进行登录（发请求）
          // post(url,{}参数对象)
          // get(url,{params:参数对象})
          this.$http
            .post('authorizations', this.LoginForm)
            .then(res => {
              // 成功跳转到首页
              this.$router.push('/')
            })
            .catch(() => {
              // 失败提示用户错误
              this.$message.error('手机号或者验证码错误')
            })
        }
      })
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
      margin: 0 auto 30px;
    }
  }
}
</style>
