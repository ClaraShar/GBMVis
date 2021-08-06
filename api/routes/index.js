var express = require('express')

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    app.get('/',function(req,res){
      res.send('hello world')
    })

    //获取tsne散点图使用
    app.get('/api/tsne', require('./tsne'))

    //获取单一数据的特征
    app.get('/api/getOneFeature', require('./getOneFeature'))

    //获取全部数据的特征
    app.get('/api/features', require('./features'))

    //获取全部数据归一化后的特征
    app.get('/api/featuresNormalized', require('./featuresNormalized'))

    //按照TN，FN，FP，TP分类获取某个flag的某个特征的值
    app.get('/api/getConfusionFeature', require('./getConfusionFeature'))

    //按照TN，FN，FP，TP分类获取四类某个特征的值
    app.get('/api/getAllConfusionFeature', require('./getAllConfusionFeature'))
}