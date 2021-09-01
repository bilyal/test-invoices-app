import {Invoice, InvoiceActionTypes, 
        ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE} from '../types/invoiceTypes';

const initialState: Invoice[] = [];

export function invoiceReducer(
    state = initialState,
    action: InvoiceActionTypes): Invoice[] {
    switch (action.type) {
        case ADD_INVOICE:
            return [...state, {
                    id: state.reduce((maxId, invoice) => Math.max(invoice.id, maxId), -1) + 1,
                    customer: action.payload.customer,
                    discount: action.payload.discount,
                    productList: action.payload.productList,
                    total: action.payload.total
                }
            ]

        case EDIT_INVOICE:
            return [...state.map(p => (p.id === action.payload.id) ? 
                    {
                        ...p,   
                        customer: action.payload.invoice.customer,
                        discount: action.payload.invoice.discount,
                        productList: action.payload.invoice.productList,
                        total: action.payload.invoice.total
                    } 
                    : p)
            ]

        case DELETE_INVOICE:
            return [...state
                    .filter(p => (p.id !== action.payload))
                    .map((x, index) => ({...x, id: index}))    
            ]

        default: return state
    }
}