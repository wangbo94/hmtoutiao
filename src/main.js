import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import '@/styles/index.less'
// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)
// 封装一个vue插件,注册全局组件
import plugin from '@/components'
Vue.use(plugin)
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
