/*
 * @Author: zhouyanheng
 * @Date: 2021-07-27 14:16:19
 * @LastEditTime: 2021-08-02 16:55:11
 * @LastEditors: zhouyanheng
 * @FilePath: \gzdt_ms\tailwind.config.js
 */


module.exports = {
  mode: 'jit', //Just-in-Time 模式,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // purge配置扫描文件,打包时删除无用类名
  darkMode: false, // or 'media' or 'class',是否开启黑夜模式
  theme: {
    // 覆盖或者扩展原主题样式，根据需要更改
    //#region 覆盖原主题的样式
    //#region 媒体查询断点(以下为默认值,可配置)
    // screens: {
    //  sm: '640px',
    // md: '768px',
    // lg: '1024px',
    // xl: '1280px',
    // '2xl': '1536px',
    // },
    //#endregion 媒体查询
    colors: {},
    //#endregion 覆盖原主题的样式

    //#region 扩展原主题的样式(extend)
    //#region 字体
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        base: "var(--color-text-base)",
        "base-soft": "var(--color-text-base-soft)",
        inverse: "var(--color-text-inverse)",
        "inverse-soft": "var(--color-text-inverse-soft)"
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)"
      },
      fontWeights: {
        normal: "var(--font-weight-normal)",
        display: "var(--font-weight-display)",
        btn: "var(--font-weight-btn)"
      },
      //#endregion
      // 背景颜色
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        base: "var(--color-bg-base)",
        inverse: "var(--color-bg-inverse)"
      },
      // 边框
      borderRadius: {
        none: "0",
        btn: "var(--rounded-btn)"
      },
    }
    //#endregion 扩展原主题的样式

  },
  variants: {
    extend: {},
  },
  plugins: [],

}
