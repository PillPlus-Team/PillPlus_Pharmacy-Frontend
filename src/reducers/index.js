import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import invoicesReducer from './invoicesReducer';
import pillStoresReducer from './pillStoresReducer';

export default combineReducers({
    user: userReducer,
    menuList: menuListReducer,
    invoices: invoicesReducer,
    pillStores: pillStoresReducer,
});
