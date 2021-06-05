const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    publicPath: '/gamelibrary',
    // 以下为alias配置
    chainWebpack: config => {

        // 静态映射
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('network', resolve('src/network'))
            .set('views', resolve('src/views'))

        // 解决ie11兼容ES6
        config.entry('main').add('babel-polyfill')
            // 开启图片压缩
            // config.module.rule('images')
            //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            //   .use('image-webpack-loader')
            //   .loader('image-webpack-loader')
            //   .options({ bypassOnDebug: true })
            // 开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }))
        }

        // 图表
        // config.module.rule('images').test(/\.js$/)
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    },
    outputDir: process.env.outputDir || 'dist',

    // 由于浏览器有跨域限制,这里cli 工具提供了 启动本地代理服务器 请求
    devServer: {
        open: true, // 是否打开浏览器;
        hotOnly: true, // 是否热更新;

        proxy: {
            '/api': { // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
                target: 'http://127.0.0.1:10000/', // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                ws: true, // 是否启用  websockets;
                pathRewrite: { // 去掉 路径中的  /api  的这一截
                    '^/api': ''
                }
            },
            '/socket.io': {
                target: 'http://jacques-fry:19091',
                ws: true, // 如果要代理 websockets，配置这个参数
                pathRewrite: {
                    // 配置参考:https://www.cnblogs.com/hanguidong/p/9460495.html
                    // '^/socket.io': '',
                },
            },
            '/file': { // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
                target: 'http://121.196.183.165:9208/file', // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                ws: true, // 是否启用  websockets;
                pathRewrite: { // 去掉 路径中的  /api  的这一截
                    '^/api': ''
                }
            }
        },

    }

}