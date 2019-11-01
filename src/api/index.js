import axios from 'axios'
import local from '@/utils/local'
import router from 'vue-router'
import JSONBIG from 'json-bigint'
// 对axios进行配置
// baseURL---设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 处理JSON格式，用json-bigint
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 配置请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 请求拦截器
axios.interceptors.request.use(config => {
  // 获取token
  const user = local.getUser() || {}
  // 头部设置
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    // 跳转登录页面  http://localhost:8080/#/login
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    // 建议使用 vue-router 来跳转 , push是router实例的函数
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
