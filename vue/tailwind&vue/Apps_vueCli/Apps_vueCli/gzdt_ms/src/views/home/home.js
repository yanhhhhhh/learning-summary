/*
 * @Author: zhouyanheng
 * @Date: 2021-07-27 09:50:01
 * @LastEditTime: 2021-07-29 09:56:54
 * @LastEditors: zhouyanheng
 * @FilePath: \Apps_vueCli\gzdt_ms\src\views\home\home.js
 */
export default {
  name: "home",
  data() {
    return {
      path: "https://www.baidu.com/",
      userId: "",
    };
  },
  methods: {
    /**
     * @description: 
     * @param {*}
     * @return {*}
     */
    openFile() {
      window["mgPlatform"].OpenFile(this.path);
    },
    clickItem() {
      console.log(this.path);
    },
    async getUserId() {
      this.userId = await window["mgContext"].GetUserId();
      console.log(this.userId);
    },
  },
};
/**
 * @description: 
 * @param {*}
 * @return {*}
 */
