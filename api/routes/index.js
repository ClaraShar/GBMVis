module.exports = function(app) {
    //应该用不上，先写着吧
    app.get('/', function(req, res){
        res.send('hello express!')
    })
    //获取tsne散点图使用
    app.get('./tsne', require('./tsne'))
};