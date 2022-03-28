/*
 * @Author: zhouyanheng
 * @Date: 2021-07-26 17:15:31
 * @LastEditTime: 2021-07-29 10:11:15
 * @LastEditors: zhouyanheng
 * @FilePath: \Apps_vueCli\gzdt_ms\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js' //vant按需导入
import './style/theme.css' // 主题样式
// import "tailwindcss/tailwind.css" // 导入tailwindcss
Vue.config.productionTip = false
// 使用Vue.prototype定义全局变量和方法(此处为主题字段)
Vue.prototype.THEME = ''; //"theme-startup"//theme-elegant
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
