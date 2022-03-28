/*
 * @Author: zhouyanheng
 * @Date: 2021-07-27 14:17:04
 * @LastEditTime: 2021-08-02 16:16:00
 * @LastEditors: zhouyanheng
 * @FilePath: \gzdt_ms\postcss.config.js
 */
module.exports = {

  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // px 转vw和vh,使用例子如下
    /* .example {
      @apply h - [22 px] py-[20px];
    } */
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['width, height'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      minPixelValue: 4, // 默认值1，小于或等于4px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    },
    // px转换成rem
    'postcss-pxtorem': {
      rootValue: 16, //root字体大小
      unitPrecision: 6,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 4,
      exclude: /node_modules/i
    }

  }

}
