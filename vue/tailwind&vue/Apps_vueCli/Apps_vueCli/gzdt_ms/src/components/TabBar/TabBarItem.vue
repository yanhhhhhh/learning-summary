<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-img"></slot></div>
      <div v-else><slot name="item-img-active"></slot></div>
      <!-- <div :class="{active:isActive}"><slot name="item-text"> </slot></div> -->
      <div :style="activeStyle"><slot name="item-text"> </slot></div>
    </div>
</template>

<script>
export default {
    name:"tabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data() {
    return {
      // isActive:true,
        };
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !==-1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor}:{}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path);
      }
    }
};
</script>

<style scoped>
.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top:3px;
  margin-bottom: 2px;
}
.active{
  color: red;
}
</style>
