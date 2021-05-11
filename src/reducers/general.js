export const actionType = {
    GET_GENERAL_TSNE_FLOW: 'GET_GENERAL_TSNE_FLOW',
    RESPONSE_GENERAL_TSNE_FLOW: 'RESPONSE_GENERAL_TSNE_FLOW'
}

const initialState = {
    general_tsne: []//其实我都不知道初始化state有啥用，不过先整一个再说吧
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case actionType.GET_TSNE_LIST:
            return {
                ...state,
                general_tsne: action.data
            }
        default:
            return state
    }
}