module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true, //启用node 中全局变量
    browser: true, //启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2,
  },
};
