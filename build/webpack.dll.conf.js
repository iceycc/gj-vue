const path = require('path');
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

const srcPath = path.join(__dirname, '../static/dll/');

module.exports = {
    entry: {
        //'muse-ui'
        vendor: [
            'vue/dist/vue.esm.js',
            'vue-router',
            'axios',
            'qs',
            'vue-localstorage',
            'material-design-icons/iconfont/material-icons.css',
            'iview/dist/styles/iview.css',
            'muse-ui/dist/muse-ui.css',
            'muse-ui/dist/theme-light.css'] // 需要打包起来的依赖
    },
    module: {
        //加载器配置
        //module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    publicPath: './',
                    limit: 1000,
                    name: 'fonts/[name].[ext]'
                }
            }]
    },
    output: {
        path: srcPath, // 输出的路径
        filename: '[name].dll.js', // 输出的文件，将会根据entry命名为vendor.dll.js
        library: '[name]_library' // 暴露出的全局变量名
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].dll.css'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.DllPlugin({
            path: path.join(srcPath, '[name]-mainfest.json'), // 描述依赖对应关系的json文件
            name: '[name]_library',
            context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
        }),
        new webpack.optimize.UglifyJsPlugin({ // uglifjs压缩
            compress: {
                warnings: false
            }
        })
    ]
}