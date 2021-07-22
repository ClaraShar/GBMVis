// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'sid':String,
    'x':Number,
    'y':Number,
    'prob':Number
})
