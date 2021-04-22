import { INVOICES_FETCH, INVOICES_SELECT, INVOICES_DISPENSE } from '../actions/types';

const initState = { list: [], selectedInvoiceID: null };

const invoicesReducer = (state = initState, action) => {
    switch (action.type) {
        case INVOICES_FETCH:
            return { list: action.invoices };

        case INVOICES_SELECT: {
            let list = state.list;
            list = list.map((invoice) => {
                if (invoice.ID === action.ID) {
                    return { ...invoice, selected: true };
                } else {
                    return { ...invoice, selected: false };
                }
            });

            return { ...state, list, selectedInvoiceID: action.ID };
        }

        case INVOICES_DISPENSE: {
            let list = state.list;
            list = list.filter((invoice) => invoice.ID !== action.ID);

            return { ...state, list, selectedInvoiceID: null };
        }

        default:
            return state;
    }
};

export default invoicesReducer;
