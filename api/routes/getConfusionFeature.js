//按照TN，FN，FP，TP分类获取某个特征的值
//前端需传入两个变量，flag和feature
let util = require('./util')
let resultModel = require('../../models/model_results')
let featureModel = require('../../models/features')

function queryConfusion(req, res) {
    new Promise((resolve, reject) => {
        featureModel.aggregate([
            {
                $lookup:{
                    from: "model_results",
                    localField: "sid",
                    foreignField: "sid",
                    as: "model_flag"
                }
            },{
                $match:{
                    "model_flag.flag" : parseInt(req.query.flag)
                }
            },{
                $project:{
                    "_id":0, "sid": 1, [req.query.feature]: 1, "model_flag.prob": 1, "model_flag.flag" : 1 
                }//变量做key要加方括号
            }
        ]).then(doc => {
            var resData = []
            doc.map((item) => {
                resData.push([item[req.query.feature], item['model_flag'][0].prob, item['sid']])
            })
            let responseData = { data: {}}
            responseData.data = resData;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports = queryConfusion

//散点图的连表查询
/*db.getCollection('feature_unnormalizeds').aggregate([
    {
    $lookup:
       {
         from: "model_results",
         localField: "sid",
         foreignField: "sid",
         as: "model_flag"
       }
    },
    {
    $match:
	{
	  "model_flag.flag" : 2
	}
    },
    {
    $project:
	{
		"_id":0, "sid": 1, "cal1_f" : 1, "model_flag.prob": 1, "model_flag.flag" : 1 
	}
    }
])*/