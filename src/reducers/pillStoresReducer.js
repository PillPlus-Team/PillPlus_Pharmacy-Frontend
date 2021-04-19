import { PILLSTORES_FETCH } from '../actions/types';

const initState = { list: [] };

const pillStoresReducer = (state = initState, action) => {
    switch (action.type) {
        case PILLSTORES_FETCH:
            return { list: action.pillStores };

        default:
            return state;
    }
};

export default pillStoresReducer;
