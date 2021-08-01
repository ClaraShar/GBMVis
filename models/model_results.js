// model_results.js

const mongoose = require('mongoose');
const modelSchema = require('../schemas/model_results')

// 输出(导出)
module.exports = mongoose.model('model_results', modelSchema);