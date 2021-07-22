let util = require('./util')
let featureModel = require('../../models/features')

function queryOneFeature(req, res) {
    new Promise((resolve, reject) => {
        featureModel.findOne({sid:req.query.sid})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryOneFeature