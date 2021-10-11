const initialState = {
    featuresData: [],
    resultData: []
}

export const actionTypes = {
    GET_FEATURES_DATA: 'GET_FEATURES_DATA',
    RESPONSE_GET_FEATURES_DATA: 'RESPONSE_GET_FEATURES_DATA',
    GET_RESULT_DATA: 'GET_RESULT_DATA',
    RESPONSE_GET_RESULT_DATA: 'RESPONSE_GET_RESULT_DATA'
}

export const actions = {
    get_features_data: function(){
        return{
            type: actionTypes.GET_FEATURES_DATA
        }
    },
    get_result_data: function(){
        return{
            type: actionTypes.GET_RESULT_DATA
        }
    }
}

export function features(state = initialState, action){
    switch(action.type){
        case actionTypes.RESPONSE_GET_FEATURES_DATA:
            return {
                ...state,
                featuresData: action.data
            }
        case actionTypes.RESPONSE_GET_RESULT_DATA:
            return {
                ...state,
                resultData: action.data
            }
        default:
            return state
    }
}