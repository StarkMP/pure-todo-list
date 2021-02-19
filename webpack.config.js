const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtactPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtactPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, 'src/core'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    devServer: {
        port: 4800,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCSSExtactPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
            }
        ]
    }
};