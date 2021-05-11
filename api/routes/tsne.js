let util = require('./util')
let tsneModel = require('../../models/tsne')

//雨薇姐写的feature是连表查询，所以我暂时模仿一下
function queryTsne(req, res, next) {
    new Promise((resolve, reject) => {
        tsneModel.find({_id: 0})
        .then(res => {
            let tsne_list = res.map(e => e.sid)
            resolve(tsne_list)
        })
    }).then(tsne_list => {
        tsneModel.find({ sid: { $in: tsne_list} })
        .then((result) => {
            let responseData = { tsne: {}}
            responseData.tsne = result;
            util.responseClient(res, 200, 0, 'success', responseData)
        })
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = queryTsne