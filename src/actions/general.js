/*
用general表示获取所有信息
*/
export const actionType = {
    GET_TSNE_LIST: 'GET_TSNE_LIST'//获取tsne坐标等信息，也就是All.json
}

//action creator
export const actions = {
    get_tsne_list: function(list) {
        //这里结合了雨薇姐general.js和todolist的actions/index.js的写法，list是随便写的
        type: actionType.GET_TSNE_LIST,
        list
    }
}