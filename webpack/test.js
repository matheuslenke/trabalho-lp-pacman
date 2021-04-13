const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = require('./base')

module.exports = merge(base, {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.min.js',
    },
    devtool: false,
    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000,
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg|xml|mp3|wav)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img',
                    },
                },
            },
            {
                test: /\.(ttf)$/i,
                use: {
                    loader: 'url-loader?limit=100000',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts',
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
})
