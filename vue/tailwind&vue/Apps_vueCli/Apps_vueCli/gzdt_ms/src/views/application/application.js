/*
 * @Author: zhouyanheng
 * @Date: 2021-07-27 09:51:57
 * @LastEditTime: 2021-08-02 14:14:20
 * @LastEditors: zhouyanheng
 * @FilePath: \gzdt_ms\src\views\application\application.js
 */

export default {
  name: "application",

  components: {},

  directives: {},

  data() {
    return {
      theme: [
        'theme-startup',
        'theme-boring',
        'theme-elegant'
      ]
    };
  },

  mounted() {

  },

  methods: {
    /**
     * @description: 切换主题
     * @param {*} theme
     * @return {*}
     */
    changeTheme(theme) {
      // 设置缓存
      localStorage.setItem('globalTheme', theme);
      this.THEME = theme;
      document.getElementById('app').setAttribute('class', this.THEME)

    }
  },
};
