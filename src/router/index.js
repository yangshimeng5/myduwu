import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/good',
    name: 'Good',
    component: () => import(/* webpackChunkName: "Good" */ '../views/Good.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/shopcar',
    name: 'Shopcar',
    component: () => import(/* webpackChunkName: "Shopcar" */ '../views/Shopcar.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */ '../views/Order.vue')
  },
  {
    path: '/addedit/:aid',
    name: 'Addedit',
    props:true,
    component: () => import(/* webpackChunkName: "Addedit" */ '../views/Addedit.vue')
  },
  {
    path: '/addlist',
    name: 'Addlist',
    component: () => import(/* webpackChunkName: "Addlist" */ '../views/Addlist.vue')
  },
  {
    path: '/details/:lid',
    name: 'Details',
    props:true,
    component: () => import(/* webpackChunkName: "Details" */ '../views/Details.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "My" */ '../views/My.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=>{
  // to 代表要访问的路径
  // from代表从那个路径进行的访问
  // next，放行函数，
  // next()放行  next('/login')强制跳转页面
  // if(to.path==='/register'){
  //   return next('/register')
  // }else 
  if(to.path==='/login' || to.path === '/register')return next();
  // 先获取token
  const tokenStr=window.sessionStorage.getItem('islogin')
  if(!tokenStr)return next('/login')
  next()
})
export default router
