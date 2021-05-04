import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import invoicesReducer from './invoicesReducer';
import statementsReducer from './statementsReducer';
import pillStoresReducer from './pillStoresReducer';
import pillStorehousesReducer from './pillStorehousesReducer';

export default combineReducers({
    user: userReducer,
    menuList: menuListReducer,
    invoices: invoicesReducer,
    statements: statementsReducer,
    pillStores: pillStoresReducer,
    pillStorehouses: pillStorehousesReducer,
});
