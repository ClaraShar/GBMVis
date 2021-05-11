import {take,call,put} from 'redux-saga/effects'
import {actionType as IndexAction} from '../reducers'
import {actionType as GeneralAction} from '../reducers/general'
import {get,post} from '../fetch/fetch'

export function* getGeneralTsne(type, list) {
    yield put({type:IndexAction.FETCH_START})//类似dispatch,触发action
    try{
        return yield call(get, `/tsne?type=${type}&list=${list}`)//发出请求，请求/tsne接口(在routes的index.js里)
    }catch(err) {
        yield put({type:IndexAction.SET_MESSAGE, msgContent:`请求错误,${err}`, msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getGeneralTsneFlow() {
    while(true) {
        let req = yield take(GeneralAction.GET_GENERAL_TSNE_FLOW)
        //处理响应
        let res = yield call(getGeneralTsne, req.stype, req.list)
        if(res){
            if(res.code === 0){
                yield put({type:GeneralAction.RESPONSE_GENERAL_TSNE_FLOW,data:res.data})
            }
        }
    }
}