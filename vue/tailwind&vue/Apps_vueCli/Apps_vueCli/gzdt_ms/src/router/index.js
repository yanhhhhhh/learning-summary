/*
 * @Author: zhouyanheng
 * @Date: 2021-07-26 17:15:31
 * @LastEditTime: 2021-08-02 14:23:38
 * @LastEditors: zhouyanheng
 * @FilePath: \gzdt_ms\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


// 定义路由
const routes = [{
    path: "",
    redirect: "/home"
  },
  {
    // 登陆
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    // 首页
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/home.vue')
  },
  {
    // 通讯录
    path: '/addressBook',
    name: 'AddressBook',
    component: () => import('@/views/addressBook/addressBook.vue')
  },
  {
    // 项目
    path: '/project',
    name: 'Project',
    component: () => import('@/views/project/project.vue')
  },
  {
    // 应用
    path: '/application',
    name: 'Application',
    component: () => import('@/views/application/application.vue')
  },
  {
    // 应用
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/mine.vue')
  },

]
// 解决vue-router重复点击路由报错的BUG（this.$router.push()）
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
//解决vue-router重复点击报错问题（this.$router.replace()）
const originalPush = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes
})

export default router
