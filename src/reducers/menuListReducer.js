import { MENULIST_FETCH } from '../actions/types';

const initState = [];

const menuListReducer = (state = initState, action) => {
    switch (action.type) {
        case MENULIST_FETCH:
            return action.menuList;

        default:
            return state;
    }
};

export default menuListReducer;
