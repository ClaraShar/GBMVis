import { combineReducers } from 'redux'
import general from './general'
import group from './group'

const rootReducer =  combineReducers({
    general,
    group
})

export default rootReducer