const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    if (isProd) {
      // // 附赠一个好方法  去除代码中的console
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 保持类名不被压缩
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true
      config.externals = {
        'BMap': 'BMap'
      }
    }
  },
  devServer: {
    // port: 8087, // 端口号
    // host: '0.0.0.0',
    open: true // 配置自动启动浏览器
  }
}
