var baseWebpackConfig = require('./webpack.base.conf')

var ExtractTextPlugin = require("extract-text-webpack-plugin")

baseWebpackConfig.module.rules = [];
baseWebpackConfig.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'docs': ExtractTextPlugin.extract('raw-loader'),
        }
    }
});

baseWebpackConfig.plugins.push(new ExtractTextPlugin('docs.md'));

module.exports = baseWebpackConfig;