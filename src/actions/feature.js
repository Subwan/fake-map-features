import axios from 'axios'
import {
    GET_FEATURES_SUCCESS,
} from 'reducers/constants';


export function getFeaturesSuccess(features) {
    return {
        type: GET_FEATURES_SUCCESS,
        features,
    }
}

export function getFeatures() {
    return (dispatch) => {

        axios.get('http://localhost:3000/features')
            .then((response) => {
                dispatch(getFeaturesSuccess(response.data.features));
            })
            .catch((error) => {
                console.log(error);
            })
    }
}