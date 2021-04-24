import React from 'react'
import ReactDom from 'react-dom'
import TsneGraph from './components/TsneGraph/TsneGraphComponent';

// 热模块替换，和路由有关的暂不修改（renderWithHotReload）
if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    <TsneGraph />, document.getElementById('app'))