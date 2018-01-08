const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: {
        app: path.join(__dirname, '../examples/index.js')
    },
    // 输出
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.join(__dirname, '..', 'examples'),
        publicPath: ''
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
    },
    plugins: [
        // 生成index.html
        new HtmlWebpackPlugin({
            // 指定模板
            template: path.join(__dirname, '..', '/examples/index.html')
        })
    ],
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, '..', "examples"),
        // 错误提示
        overlay: {
            errors: true
        },
        compress: true,
        port: 9000
    }
}