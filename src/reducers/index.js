import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import invoicesReducer from './invoicesReducer';
import pillStoresReducer from './pillStoresReducer';
import pillsReducer from './pillsReducer';

export default combineReducers({
    user: userReducer,
    menuList: menuListReducer,
    invoices: invoicesReducer,
    pillStores: pillStoresReducer,
    pills: pillsReducer,
});
