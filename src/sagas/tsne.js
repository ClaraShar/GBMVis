import {put, take, call} from 'redux-saga/effects';
import { actionTypes as tsneActionTypes  } from '../reducers/tsne';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function *getTSNEDataFlow(){
    while(true){
        let req = yield take(tsneActionTypes.GET_TSNE_DATA);
        let res = yield call(getTSNEData) //这里转到下面的函数
        yield put({type: tsneActionTypes.RESPONSE_GET_TSNE_DATA, data: res.data});
        console.log('getTsneData===> ', res.data)
    }
}

export function *getTSNEData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/tsne') //这一步应该是api/routes里的路由
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}