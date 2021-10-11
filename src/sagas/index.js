import {fork} from 'redux-saga/effects';
import { getFeaturesDataFlow } from './features';

export default function* rootSaga(){
    yield fork(getFeaturesDataFlow);
}