import {
    GET_FEATURES_SUCCESS,
    SET_ACTIVE_FEATURE,
} from 'reducers/constants';

const initialState = {
    features: []
}

const ACTION_HANDLER = {

    [GET_FEATURES_SUCCESS]: (state, action) => {
        return ({ ...state, features: action.features });
    },

    [SET_ACTIVE_FEATURE]: (state, action) => {
        return ({ ...state, activeFeature: action.id});
    },
}

export default function featuresReducer(state = initialState, action) {
    const handler = ACTION_HANDLER[action.type];
    return handler ? handler(state, action) : state;
}