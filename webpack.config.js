const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: __dirname + '/assets',
      filename: '[name].[contenthash:8].js',
      publicPath: '/assets/'
    },
    module: {
      rules:[
        {
          test: /\.s[ac]ss$/,
          loaders: [
            'style-loader',
            { loader:MiniCssExtractPlugin.loader, options: { hmr: false } },
            'css-loader',
            'sass-loader'
          ]
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        protectWebpackAssets: true
      }),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        filename: '../_includes/webpacked-libs.html'
      }),
       new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    ]
}
