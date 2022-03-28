<!--
 * @Author: zhouyanheng
 * @Date: 2021-07-26 17:15:31
 * @LastEditTime: 2021-07-29 10:31:53
 * @LastEditors: zhouyanheng
 * @FilePath: \Apps_vueCli\gzdt_ms\src\App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#B6282C">
        <img
          slot="item-img"
          src="./assets/img/components/tabbar/home.svg"
          alt=""
        />
        <img
          slot="item-img-active"
          src="./assets/img/components/tabbar/home_active.svg"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/addressBook" activeColor="#B6282C">
        <img
          slot="item-img"
          src="./assets/img/components/tabbar/address_book.svg"
          alt=""
        />
        <img
          slot="item-img-active"
          src="./assets/img/components/tabbar/address_book_active.svg"
          alt=""
        />
        <div slot="item-text">通讯录</div>
      </tab-bar-item>
      <tab-bar-item path="/application" activeColor="#B6282C">
        <img
          slot="item-img"
          src="./assets/img/components/tabbar/application.svg"
          alt=""
        />
        <img
          slot="item-img-active"
          src="./assets/img/components/tabbar/application_active.svg"
          alt=""
        />
        <div slot="item-text">应用</div>
      </tab-bar-item>
      <tab-bar-item path="/mine" activeColor="#B6282C">
        <img
          slot="item-img"
          src="./assets/img/components/tabbar/mine.svg"
          alt=""
        />
        <img
          slot="item-img-active"
          src="./assets/img/components/tabbar/mine_active.svg"
          alt=""
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/tabBar/tabBar";
import TabBarItem from "./components/tabBar/tabBarItem";
export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem,
  },
  created() {
    this.setSkin();
    console.log("theme:", this.THEME);
  },
  mounted() {},
  methods: {
    /**
     * @description:设主题
     * @param {*}
     * @return {*}
     */
    setSkin() {
      //读取缓存中的主题，无缓存为默认主题
      let currentTheme = localStorage.globalTheme;
      if (currentTheme) {
        this.THEME = currentTheme;
        this.$nextTick(async () => {
          document.getElementById("app").setAttribute("class", this.THEME);
        });
      }
    },
  },
};
</script>

<style>
/* 注：@import中路劲需要使用 “~”（“~”是 stylus-loader中的定义） */
@import "~@/style/base.css";
</style>