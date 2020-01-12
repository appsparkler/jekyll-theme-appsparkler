const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: __dirname + '/js',
      filename: '[name].[contenthash:8].js',
      publicPath: '/assets/js'
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        protectWebpackAssets: true
      }),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        filename: '../../_includes/webpacked-libs.html'
      })
    ]
}
