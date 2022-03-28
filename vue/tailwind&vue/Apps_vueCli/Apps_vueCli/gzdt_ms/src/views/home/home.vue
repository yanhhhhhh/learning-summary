<template>
  <div>
    <h2>首页</h2>
    <van-button type="default" @click="openFile" >打开百度</van-button>
    <van-button  @click="clickItem" class="btn-blue">点击(vant搭配tailwind)</van-button>
    <van-button type="danger" @click="getUserId">获userId</van-button>
    <div class="or_test">测试样式引入</div>
  </div>
</template>


<script src="./home.js"></script>

<style scoped src="./home.css"></style>
