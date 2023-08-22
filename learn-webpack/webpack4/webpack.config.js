const {resolve} = require('path')
// HtmlWebpackPlugin为构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  entry:'./src/js/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'dist')
  },
  module:{
    rules: [
     // loader的配置
     {
      // 处理less资源
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    },
      { 
        //处理css
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader',
        ]

      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
         // 处理其他资源
        exclude:/\.(html|css|less|js|png|gif|jpg)/,
        loader:'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }


      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
  
}