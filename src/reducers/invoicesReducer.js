import { INVOICES_FETCH, INVOICES_FETCH_BY_IO, INVOICES_SELECT, INVOICES_DISPENSE } from '../actions/types';

const initState = { list: [], selectedInvoice_id: null };

const invoicesReducer = (state = initState, action) => {
    switch (action.type) {
        case INVOICES_FETCH:
            return { list: action.invoices };

        case INVOICES_FETCH_BY_IO: {
            let selectedInvoice_id = null;

            let list = state.list;
            list = action.newInvoices.map((newInvoice) => {
                const oldInvoice = list.find((oldInvoice) => oldInvoice._id === newInvoice._id);
                if (oldInvoice) {
                    if (oldInvoice.selected) {
                        selectedInvoice_id = oldInvoice._id;
                    }

                    return oldInvoice;
                } else {
                    return { ...newInvoice, selected: false };
                }
            });

            return { ...state, list, selectedInvoice_id };
        }

        case INVOICES_SELECT: {
            let list = state.list;
            list = list.map((invoice) => {
                if (invoice._id === action._id) {
                    return { ...invoice, selected: true };
                } else {
                    return { ...invoice, selected: false };
                }
            });

            return { ...state, list, selectedInvoice_id: action._id };
        }

        case INVOICES_DISPENSE: {
            let list = state.list;
            list = list.filter((invoice) => invoice._id !== action._id);

            return { ...state, list, selectedInvoice_id: null };
        }

        default:
            return state;
    }
};

export default invoicesReducer;
