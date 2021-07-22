// features.js

const mongoose = require('mongoose');
const featureSchema = require('../schemas/features')

// 输出(导出)
module.exports = mongoose.model('feature_unnormalizeds', featureSchema); // 定义一个feature模型，可以根据这个模型调用其API方法。
// 这个模型定义的是数据库eduRedar的feature_unnormalizeds集合数据，所以这个model取名feature是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"features"来查找数据集合。
