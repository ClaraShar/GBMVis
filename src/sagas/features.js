import {put, take, call} from 'redux-saga/effects';
import { actionTypes as featuresActionTypes  } from '../reducers/features';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function *getFeaturesDataFlow(){
    while(true){
        let req = yield take(featuresActionTypes.GET_FEATURES_DATA);
        let res = yield call(getFeaturesData) //这里转到下面的函数
        yield put({type: featuresActionTypes.RESPONSE_GET_FEATURES_DATA, data: res.data});
        console.log('getFeaturesData===> ', res.data)
    }
}

export function *getFeaturesData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/features') //这一步应该是api/routes里的路由
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}