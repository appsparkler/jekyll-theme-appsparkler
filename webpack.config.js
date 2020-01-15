const {resolve} = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('assets'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.scss', '.sass'],
  },
  module: {
    rules: [
      {
        test: /.s[ac]ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]},
  plugins: [
    new DashboardPlugin(),
  ],
}
