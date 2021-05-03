import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';

const middlewares = [reduxThunk, reduxLogger];

const persistedReducer = persistReducer({ key: 'pharmacy-root', storage }, rootReducer);

const configureStore = createStore(persistedReducer, applyMiddleware(...middlewares));

export default configureStore;
