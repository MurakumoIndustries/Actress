const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV) // true
    if (env.NODE_ENV === 'production') {
        console.log("!!!RELEASE!!!");
    }
    else {
        console.log("debug");
    }
    var plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.nojekyll']
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new WebpackPwaManifest({
            id: "MI_Actress",
            publicPath: './',
            name: "MI|Actress",
            short_name: "MI|Actress",
            theme_color: "#FAFAFA",
            background_color: '#FAFAFA',
            icons: [{
                    src: path.resolve('./src/img/murakumo.svg'),
                    sizes: [96, 128, 192, 256, 384, 512, 1024] // multiple sizes
                },
                {
                    src: path.resolve('./src/img/murakumo.png'), //fallback for chrome
                    sizes: [96, 128, 192, 256, 384, 512, 1024]
                }
            ]
        }),
        new InjectManifest({
            swSrc: './src/js/sw.js',
            swDest: 'sw.js',
            maximumFileSizeToCacheInBytes: 8192 * 1024 * 1024
        })
    ];

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
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext][query]',
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                //hmr: isDev,
                            },
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS modules
                        },
                        {
                            loader: 'postcss-loader', // Run postcss actions
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: 'asset/inline'
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
                },
                {
                    test: /\.js?$/,
                    exclude: file => (
                        /node_modules/.test(file) &&
                        !/\.vue\.js/.test(file)
                    ),
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: plugins
    }
};