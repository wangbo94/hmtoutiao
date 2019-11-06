<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" v-model="userInfo.email">
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="updatePhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import local from '@/utils/local';
// eslint-disable-next-line semi
import eventBus from '@/eventBus';
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        photo: null
      },
      imageUrl: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    //  保存用户信息
    async saveInfo () {
      // patch 都是修改请求 局部修改
      // put  都是修改请求  完整修改
      await this.$http.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      this.$message.success('保存成功')
      // 更新home
      eventBus.$emit('updateName', this.userInfo.name)
      // 更新本地存储
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    },
    // 修改头像（上传图片）
    async updatePhoto (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果
      // 1，获取图片文件数据
      const file = result.file
      // 2创建一个formdate
      const formData = new FormData()
      // 3追加图片数据到formData 字段名字和后台一致
      formData.append('photo', file)
      // 4 使用axios提交数据
      const {
        data: { data }
      } = await this.$http.patch('user/photo', formData)
      //  5拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      //  6提示
      this.$message.success('头像修改成功')
      // 7更新home组件的photo
      eventBus.$emit('updatePhoto', data.photo)
      // 8 更新本地存储的photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
