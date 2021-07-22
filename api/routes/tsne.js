let util = require('./util')
let tsneModel = require('../../models/tsnes')

function queryTsne(req, res) {
    new Promise((resolve, reject) => {
        tsneModel.find({})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryTsne