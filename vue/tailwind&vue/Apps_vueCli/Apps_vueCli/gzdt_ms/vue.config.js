const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 生产环境相对路径配置 
  outputDir: './dist/gzdt', //打包输出环境
  configureWebpack: (config) => {
    // config.resolve.alias.set('@', resolve('src'))
    //   .set('assets', resolve('src/assets'))
    //   .set('pages', resolve('src/pages'))
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

    } else {
      // 为开发环境修改配置...

    }
  }
}