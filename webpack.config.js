const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './public/script.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env'] },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    { loader: 'css-loader' },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        contentBase: './build',
        port: 3000,
        publicPath: 'http://localhost:3000',
        hotOnly: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            proxy: 'http://localhost:3000/',
        }),
        new HtmlWebPackPlugin({
            template: path.resolve('./public/index.html'),
        }),
        new MiniCssExtractPlugin({ filename: './public/style.css' }),
    ],
};
