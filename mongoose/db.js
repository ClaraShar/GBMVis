// db.js

var mongoose = require('mongoose');
var Features = require('./feature.js');
var Flags = require('./flag.js');

// 链接MongoDB数据库,数据库的名称叫eduRedar
mongoose.connect('mongodb://localhost:27017/eduRedar');

// 连接成功操作
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
})

// 连接失败操作
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail.")
})

// 连接断开操作
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected.")
})

// 连接成功之后，用model的feature模型查询到数据库的feature_unnormalized集合。
// Data Overview默认表格
// Features.find({},function(err, doc){ 
//     if(err) {
//         console.log(err.message)
//     }else{
//         console.log(doc)
//     }
// })

//直接查询
// Features.findOne({'sid': "2010071050025"}, function (err, result) {
//     if (err) {
//         console.log('select failed');
//     } else {
//         console.log(result);
//     }
// });

//查询一条
var query = Features.findOne({'sid': "2010071050025"});
query.select();
query.exec(function (err, result) {
    if (err) {
        console.log('select failed');
    } else {
        console.log(result);
    }
});

//查询多条，旭日图选中
// var query = Flags.find({ 'flag': 1 });
// query.select();
// query.exec(function (err, result) {
//     if (err) {
//         console.log('select failed');
//     } else {
//         console.log(result);
//     }
// });

//两个表关联查询，用于散点图操作
Flags.aggregate([
    {
      $lookup:
      {
        from: "feature_unnormalized",
        localField: "sid",
        foreignField: "sid",
        as: "scatter"
      }
    },{
        $match:
        {
            "flag":2,//筛选flag
        }
    },{
        $project:
        {//只显示flag、4_lib、sid
          "flag": 1,
          "scatter.4_lib":1,//筛选特征
          "sid":1,
        }
    }
  ],function(err,docs){
    if (err) {
        console.log('select failed');
    } else {
        console.log(docs);
        // console.log(docs[0].scatter[0]['4_lib']);//其中某一条,第一个0是index，第二个0不动
        // console.log(JSON.stringify(docs))；//转换成json
    }
})