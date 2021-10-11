import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas';

const win = window;
const sagaMiddleware = createSagaMiddleWare();
const middlewares = [];

let storeEnhancers = compose(
    applyMiddleware(...middlewares, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function configureStore(initialStore={}){
    const store = createStore(rootReducer, initialStore, storeEnhancers);
    sagaMiddleware.run(rootSaga);
    if(module.hot){
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    };
    return store;
}