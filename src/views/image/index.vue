<template>
  <div class="container-images">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="open">添加素材</el-button>
      </div>
      <!-- 图片列表--->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
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
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!--
          action 是上传图片的地址
          headers 上传组件的请求头
      -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :on-success="handleSuccess"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import local from '@/utils/local';
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      // 控制对话框显示与隐藏
      dialogVisible: false,
      total: 0,
      // 上传成功后的图片地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const {
        //    获取数据
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      //    总条数赋值
      this.total = data.total_count
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
    // 切换 添加、取消收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功（改当前图片的状态，提示）
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 上传图片成功
    handleSuccess (res) {
      // res就是响应主体，res.data.url就是图片地址
      this.imageUrl = res.data.url
      //   提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 2s之后关闭页面
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px #ddd dashed;
    display: inline-block;
    position: relative;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
