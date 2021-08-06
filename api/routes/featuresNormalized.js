let util = require('./util')
let featureNModel = require('../../models/feature_normalizeds')

function queryNFeatures(req, res) {
    new Promise((resolve, reject) => {
        featureNModel.find({})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryNFeatures