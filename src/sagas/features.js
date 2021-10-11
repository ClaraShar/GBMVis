import {put, take, call} from 'redux-saga/effects';
import { actionTypes as featureActionTypes  } from '../reducers/features';
import { actionTypes as IndexActionTypes } from '../reducers/index';
import {get, post} from '../fetch/fetch';

export function* getFeaturesDataFlow(){
    while(true){
        let req = yield take(featureActionTypes.GET_FEATURES_DATA);
        let res = yield call(getFeaturesData)
        yield put({type: featureActionTypes.RESPONSE_GET_FEATURES_DATA, data: res.data});
        console.log('getFeaturesData===> ', res.data)
    }
}

export function *getFeaturesData(){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get, '/featuresData')
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
        console.log('网络请求错误');
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}