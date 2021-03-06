import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import Images from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        {
          path: '/',
          component: Welcome
        },
        {
          path: '/article',
          component: Article
        },
        {
          path: '/image',
          component: Images
        },
        {
          path: '/publish',
          component: Publish
        },
        {
          path: '/comment',
          component: Comment
        },
        {
          path: '/setting',
          component: Setting
        },
        {
          path: '/fans',
          component: Fans
        }
      ]
    },
    // 匹配  不符合路由规则的路径
    {
      path: '*',
      component: NotFound
    }
  ]
})
// 访问权限控制
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to跳转的目标路由对象
  // from从哪里跳过来的路由对象
  // next() 放行
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
