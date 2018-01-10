const path = require('path');

const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'js', 'index.jsx'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2', 'react'],
                        plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        modules: [path.join(__dirname, 'src', 'js'), 'node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
    },
};
