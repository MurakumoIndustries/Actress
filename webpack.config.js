const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV) // true
    if (env.NODE_ENV === 'production') {
        console.log("!!!RELEASE!!!");
    }
    else {
        console.log("debug");
    }
    var plugins = [
        new CleanWebpackPlugin(['docs'], { exclude: ['.nojekyll'] }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
    ];
    if (env.NODE_ENV === 'production') {
        plugins.push(new OfflinePlugin({
            appShell: '/Actress/',
            autoUpdate: true,
        }));
        plugins.push(
            new WebpackPwaManifest({
                short_name: "MI|Actress",
                short_name: "MI|Actress",
                theme_color: "#FAFAFA",
                background_color: '#FAFAFA',
                icons: [{
                    src: path.resolve('./src/img/murakumo.png'),
                    sizes: [96, 128, 192, 256, 384, 512, 1024] // multiple sizes
                }]
            })
        );
    }

    return {
        mode: env.NODE_ENV || 'production',
        entry: {
            data: './src/js/data.js',
            main: './src/index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'docs')
        },
        optimization: {
            splitChunks: {
                // include all types of chunks
                //chunks: 'all'
            }
        },
        resolve: {
            alias: env.NODE_ENV !== 'production' ? {
                'vue$': 'vue/dist/vue.esm.js'
            } : {}
        },
        module: {
            rules: [{
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        env.NODE_ENV !== 'production' ? 'vue-style-loader' : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                //publicPath: '../'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {

                        },
                        extractCSS: true,
                        // other vue-loader options go here
                    }
                }
            ]
        },
        plugins: plugins
    }
};