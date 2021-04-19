import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import './css/tailwind.css';

import App from './App';

import configureStore from './store/configureStore';

const persistor = persistStore(configureStore);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={configureStore}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
