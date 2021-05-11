import React from 'react'
import ReactDom from 'react-dom'
import AppIndex from './components/AppIndex'
import configStore from './reducers/store'
import { Provider } from 'react-redux'

// 热模块替换，和路由有关的暂不修改（renderWithHotReload）
if (module.hot) {
    module.hot.accept();
}

const store = configStore()
ReactDom.render(
    <Provider store={store}>
        <AppIndex />
    </Provider>, document.getElementById('app'))