// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'sid': String,
    'real': Number,
    'predict': Number,
    'prob': Number,
    'flag': Number
})
