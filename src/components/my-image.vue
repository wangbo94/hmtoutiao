<template>
  <div class="my-image">
    <!-- 按钮-->
    <div class="btn_box" @click="open">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框-->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库-->
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              class="img_item"
              v-for="item in images"
              :key="item.id"
              @click="selectedImage(item.url)"
            >
              <img :src="item.url" />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片-->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import local from '@/utils/local';
// eslint-disable-next-line semi
import defaultImage from '../assets/default.png';
export default {
  //  父传子
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      uploadImageUrl: null,
      // 按钮的默认图片
      defaultImage
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    //  分页函数
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        //    获取数据
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      //    总条数赋值
      this.total = data.total_count
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      // res就是响应主体，res.data.url就是图片地址
      this.uploadImageUrll = res.data.url
      //   提示
      this.$message.success('上传成功')
    },
    //  确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // 素材库
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选中一张图片')
        }
        // this.defaultImage = this.selectedImageUrl
        // 子传父 双向绑定
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
        // 给img的src赋值图片地址
      } else {
        // 上传图片
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // this.defaultImage = this.uploadImageUrl
        // 子传父 双向绑定
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;

  .btn_box {
    height: 150px;
    width: 150px;
    border: dashed 1px #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .dialog-footer {
    width: 100%;
    text-align: center;
    display: block;
  }
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px #ddd dashed;
    display: inline-block;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
        center / 50px 50px;
    }
  }
}
</style>
