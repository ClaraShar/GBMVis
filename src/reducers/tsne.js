const initialState = {
    tsneData: []
}

export const actionTypes = {
    GET_TSNE_DATA: 'GET_TSNE_DATA',
    RESPONSE_GET_TSNE_DATA: 'RESPONSE_GET_TSNE_DATA',
}

export const actions = {
    get_tsne_data: function(){
        return{
            type: actionTypes.GET_TSNE_DATA
        }
    }
}

export function tsne(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_GET_TSNE_DATA:
            return {
                ...state,
                tsneData: action.data
            }
        default:
            return state
    }
}