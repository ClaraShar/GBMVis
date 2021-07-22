// tsne.js

const mongoose = require('mongoose');
const tsneSchema = require('../schemas/tsnes')

// 输出(导出)
module.exports = mongoose.model('tsne_scatters', tsneSchema); 
