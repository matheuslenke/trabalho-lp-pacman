const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.min.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml|mp3|wav)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader?limit=100000',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts',
                    },
                },
            },
        ],
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../assets', '**', '*'),
                    to: path.resolve(__dirname, '../dist'),
                },
                {
                    from: path.resolve(__dirname, '../favicon.ico'),
                    to: path.resolve(__dirname, '../dist'),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
        }),
    ],
}
