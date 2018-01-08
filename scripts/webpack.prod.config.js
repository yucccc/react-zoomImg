const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    // 输出
    output: {
        filename: 'react-zoomImg.js',
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '',
        libraryTarget: 'umd',
        library: 'react-zoomImg',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /jsx$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react','es2015','stage-0']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
    },
    // 忽略扩展名
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {}
    }
}