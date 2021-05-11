import {fork} from 'redux-saga/effects'

import {getGeneralTsneFlow} from './generalSaga'

export default function* rootSaga() {
    yield fork(getGeneralTsneFlow)
}