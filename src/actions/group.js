/*
用group表示获取分类信息
*/
export const actionType = {
    GET_GROUP_FEATURES: 'GET_GROUP_FEATURES'//先瞎写的，为了测试combineReducer
}

//action creator
export const actions = {
    get_group_features: function (flag, list) {
        return {
            //这里结合了雨薇姐general.js和todolist的actions/index.js的写法，list是随便写的
            type: actionType.GET_TSNE_LIST,
            flag,
            list
        }
    }
}