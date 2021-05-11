const path = require('path');

module.exports = {
 
    /*入口*/
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

     /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),//URL的根目录。如果不设定的话，默认指向项目根目录。
        historyApiFallback: true,
        host: '0.0.0.0'
    },
    devtool: 'inline-source-map', // 调试代码用，可以定位到错误源码源文件，而不是bundle.js
};