process.env.NODE_ENV = 'production'

const path = require('path');
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

const srcPath = path.join(__dirname, '../static/dll/');
////'muse-ui' 异常
const vendors = ['vue/dist/vue.esm.js',
    'vue-router',
    'axios',
    'qs',
    'vue-localstorage',
    'material-design-icons/iconfont/material-icons.css',
    'iview/dist/styles/iview.css',
    'iview/src/components/tag/tag.vue',
    'iview/src/components/collapse/panel.vue',
    'iview/src/components/collapse/collapse.vue',
    'iview/src/components/date-picker/',
    'muse-ui/src/appBar',
    'muse-ui/src/raisedButton',
    'muse-ui/src/iconButton',
    'muse-ui/src/selectField',
    'muse-ui/src/textField',
    'muse-ui/src/menu/menu.vue',
    'muse-ui/src/divider',
    'muse-ui/src/infiniteScroll',
    'muse-ui/src/menu/menuItem.vue',
    'muse-ui/src/avatar',
    'muse-ui/src/list/list.vue',
    'muse-ui/src/list/listItem.vue'
];

webpackConfig = {
    entry: {
        vendor: vendors
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /iview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /muse-ui.src.*?js$/,
                loader: 'babel-loader'
            },
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
        new webpack.optimize.UglifyJsPlugin({ // uglifjs压缩
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            path: path.join(srcPath, '[name]-mainfest.json'), // 描述依赖对应关系的json文件
            name: '[name]_library',
            context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
        })
    ]
}

if (process.env.npm_config_report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;