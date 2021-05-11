import rootReducer from './index'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/indexSaga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()//1、 使用createSagaMiddleware方法创建saga 的Middleware

export default function configStore(initialState = {}) {
    // 2、然后在创建的redux的store时，使用applyMiddleware函数将创建的saga Middleware实例绑定到store上
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)))
    // 3、 最后可以调用saga Middleware的run函数来执行某个或者某些Middleware。
    sagaMiddleware.run(rootSaga)
    return store
}