import { STATEMENTS_FETCH_BY_MONTH, STATEMENTS_SHOW } from '../actions/types';

const initState = { list: [], month: null, year: null };

const statementsReducer = (state = initState, action) => {
    switch (action.type) {
        case STATEMENTS_FETCH_BY_MONTH:
            return { list: action.invoiceHistoryList, month: action.month, year: action.year, balanced: action.balanced };

        case STATEMENTS_SHOW: {
            if (state.month === action.month && state.year === action.year) {
                let list = state.list;
                list = list.map((statement) => {
                    if (action._idList.includes(statement._id)) {
                        return { ...statement, show: true };
                    } else {
                        return { ...statement, show: false };
                    }
                });

                return { ...state, list: list };
            } else {
                return state;
            }
        }

        default:
            return state;
    }
};

export default statementsReducer;
