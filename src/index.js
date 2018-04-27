import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from 'components/App.js';
import fakeMapApp from 'reducers/index';

let store = createStore(
    fakeMapApp, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),  
    applyMiddleware(thunk)
);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
),
    document.getElementById('root'));
//registerServiceWorker();
