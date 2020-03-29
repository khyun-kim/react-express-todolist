import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store';

const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Root />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
