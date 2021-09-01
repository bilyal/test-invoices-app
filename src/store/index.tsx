import {combineReducers} from 'redux';
import customerReducer from './reducers/customerReducer';
import {productReducer} from './reducers/productReducer';
import {invoiceReducer} from './reducers/invoiceReducer';


export const rootReducer = combineReducers({
    customer: customerReducer,
    product: productReducer,
    invoice: invoiceReducer
})

export type AppState = ReturnType<typeof rootReducer>