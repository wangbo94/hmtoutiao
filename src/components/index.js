import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'

export default {
  install (Vue) {
    // 基于vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
