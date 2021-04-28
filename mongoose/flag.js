// flag.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 定义一个Schema
var flagSchema = new Schema({
    'sid':String,
    'real':Number,
    'predict':Number,
    'flag':Number,
    'prob':Number,
})

// 输出(导出)
module.exports = mongoose.model('flag',flagSchema, 'model_results'); // 定义一个flag模型，可以根据这个模型调用其API方法。
// 这个模型定义的是数据库eduRedar的model_results集合数据，所以这个model取名flag是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"flags"来查找数据集合。