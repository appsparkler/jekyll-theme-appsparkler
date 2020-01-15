const {resolve} = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('assets'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.scss', '.sass'],
    alias: {
      '@styles': resolve('src/styles'),
    },
    modules: [
      resolve('node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /.s[ac]ss$/,
        loaders: [
          {options: {hmr: false}, loader: MiniCssExtractPlugin.loader},
          'css-loader',
          'sass-loader',
        ],
      },
    ]},
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash].css',
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HTMLPlugin({
      template: resolve('src/ejs/link-tags.ejs'),
      filename: '../_includes/headlibs.html',
      inject: false,
      templateParameters: (compilation, assets, assetTags, options) => {
        console.log(assets.css[0])
        return {
          compilation,
          'webpackConfig': compilation.options,
          'htmlWebpackPlugin': {
            tags: assetTags,
            files: assets,
            options,
          },
          'cssHref': assets.css[0],
        }
      },
    }),
    new HTMLPlugin({
      template: resolve('src/ejs/script-tags.ejs'),
      filename: '../_includes/footlibs.html',
      inject: false,
      templateParameters: (compilation, assets, assetTags, options) => {
        console.log(assets.css[0])
        return {
          compilation,
          'webpackConfig': compilation.options,
          'htmlWebpackPlugin': {
            tags: assetTags,
            files: assets,
            options,
          },
          'jsSrc': assets.js[0],
        }
      },
    }),
  ],
}

// new HtmlWebpackPlugin({
//       // NOTE if you pass plain object it will be passed as is. no default values there, so be aware!
//       // for implementation detail, please see index.js and search for "userOptions" variable
//       templateParameters: (compilation, assets, assetTags, options) => {
//         return {
//           compilation,
//           webpackConfig: compilation.options,
//           htmlWebpackPlugin: {
//             tags: assetTags,
//             files: assets,
//             options
//           },
//           'foo': 'bar'
//         };
//       },
//       template: 'index.ejs'
//     })
