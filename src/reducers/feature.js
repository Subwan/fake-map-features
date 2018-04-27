import {
    GET_FEATURES_SUCCESS,
} from 'reducers/constants';

const ACTION_HANDLER = {

    [GET_FEATURES_SUCCESS]: (state = [], action) => {
        console.log([...state]);
       const features = [...state];
       console.log('1',features)
      // features.push(action.features);
      // console.log('2',features);
        return ({ ...state, features });
       // return Object.assign({}, state, action.features);

    }
}

export default function featuresReducer(state = [], action) {
    const handler = ACTION_HANDLER[action.type];
    return handler ? handler(state, action) : state;
}