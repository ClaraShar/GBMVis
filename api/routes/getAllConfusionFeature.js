//按照TN，FN，FP，TP分类获取某个特征的值
//前端只需传入feature，分4类获取所有值
let util = require('./util')
let resultModel = require('../../models/model_results')
let featureModel = require('../../models/features')

function queryAllConfusion(req, res) {
    var resData = []
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
                $project:{
                    "_id":0, "sid": 1, [req.query.feature]: 1, "model_flag.prob": 1, "model_flag.flag" : 1 
                }//变量做key要加方括号
            }
        ]).then(doc => {
            var TNData = [],
                FNData = [],
                FPData = [],
                TPData = [];
            doc.map((item) => {
                resData.push([item['model_flag'][0].flag,item[req.query.feature], item['model_flag'][0].prob, item['sid']])
            })
            for(let i = 0; i < resData.length; i++){
                if(resData[i][0] == 0) { TNData.push(resData[i].slice(1)) }
                else if(resData[i][0] == 1) { FNData.push(resData[i].slice(1)) }
                else if(resData[i][0] == 2) { FPData.push(resData[i].slice(1)) }
                else if(resData[i][0] == 3) { TPData.push(resData[i].slice(1)) }
            }
            resData = []
            resData.push(TNData)
            resData.push(FNData)
            resData.push(FPData)
            resData.push(TPData)
            let responseData = { data: {}}
            responseData.data = resData;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch(err => {
            console.log(err)
    })
}

module.exports = queryAllConfusion

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