import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import pillStoresReducer from './pillStoresReducer';

export default combineReducers({
    user: userReducer,
    menuList: menuListReducer,
    pillStores: pillStoresReducer,
});
