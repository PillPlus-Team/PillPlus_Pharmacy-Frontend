import { PILLSTOREHOUSES_FETCH, PILLSTOREHOUSES_SHOW, PILLSTOREHOUSES_EDIT_TOGGLE, PILLSTOREHOUSES_UPDATE_AMOUNT } from '../actions/types';

const initState = { list: [] };

const pillStorehousesReducer = (state = initState, action) => {
    switch (action.type) {
        case PILLSTOREHOUSES_FETCH:
            return { list: action.pillStorehouses };

        case PILLSTOREHOUSES_SHOW: {
            let list = state.list;
            list = list.map((pillStorehouse) => {
                if (action._idList.includes(pillStorehouse._id)) {
                    return { ...pillStorehouse, show: true };
                } else {
                    return { ...pillStorehouse, show: false };
                }
            });

            return { ...state, list };
        }

        case PILLSTOREHOUSES_EDIT_TOGGLE: {
            let list = state.list;
            list = list.map((pillStorehouse) => {
                if (pillStorehouse._id === action._id) {
                    return { ...pillStorehouse, editing: !pillStorehouse.editing };
                } else {
                    return pillStorehouse;
                }
            });

            return { ...state, list };
        }

        case PILLSTOREHOUSES_UPDATE_AMOUNT: {
            let list = state.list;
            list = list.map((pillStorehouse) => {
                if (pillStorehouse._id === action.pillStorehouse._id) {
                    return {
                        ...action.pillStorehouse,
                        editing: false,
                    };
                } else {
                    return pillStorehouse;
                }
            });

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default pillStorehousesReducer;
