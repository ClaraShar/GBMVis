let util = require('./util')
let featureModel = require('../../models/features')

function queryFeatures(req, res) {
    new Promise((resolve, reject) => {
        featureModel.find({})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryFeatures