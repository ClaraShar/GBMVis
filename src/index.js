import React from 'react'
import ReactDom from 'react-dom'
import RedarGraph from './components/RedarGraph/RedarGraphComponent'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'

// 热模块替换，和路由有关的暂不修改（renderWithHotReload）
if (module.hot) {
    module.hot.accept();
}

const store = createStore(rootReducer)

ReactDom.render(
    <Provider store={store}>
        <RedarGraph />
    </Provider>, document.getElementById('app'))