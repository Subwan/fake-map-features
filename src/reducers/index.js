import { combineReducers } from 'redux';
import featureReducer from 'reducers/feature';

const fakeMapApp = combineReducers({
    features: featureReducer,
})

export default fakeMapApp;