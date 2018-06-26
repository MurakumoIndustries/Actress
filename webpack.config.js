const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  console.log('Production: ', env.production) // true
  var plugins = [
    new CleanWebpackPlugin(['docs']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin("[name].[contenthash].css"),
    //new CopyWebpackPlugin([
    //  { from: 'src/img', to: 'img' }
    //]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "data",
    })
  ];
  if (env.production === true) {
    console.log("!!!RELEASE!!!");
    plugins.push(new UglifyJSPlugin());
  }
  else {
    console.log("debug");
  }

  return {
    entry: {
      data: './src/js/data.js',
      main: './src/index.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'docs')
    },
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          }, {
            loader: 'expose-loader',
            options: '$'
          }]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(tpl|html)$/,
          include: [
            path.resolve(__dirname, "src/template")
          ],
          use: [
            {
              loader: 'underscore-template-loader',
              options: {
                globalLodash: true,
                root: '/assets/img',
                parseDynamicRoutes: true,
              }
            }
          ]
        }
      ]
    },
    plugins: plugins
  }
};