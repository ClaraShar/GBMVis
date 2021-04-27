import { actionType,actions } from '../actions/group'

const initialState = {
    group_features: []//其实我都不知道初始化state有啥用，不过先整一个再说吧
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case actionType.GET_GROUP_FEATURES:
            return {
                ...state,
                group_features: action.data
            }
        default:
            return state
    }
}