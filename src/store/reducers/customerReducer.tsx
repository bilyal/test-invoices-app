import {CustomerState, CustomerActionTypes, 
        ADD_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER, 
        FETCH_CUSTOMERS, FETCH_CUSTOMERS_SUCCEEDED, FETCH_CUSTOMERS_FAILED} from '../types/customerTypes'

const initialState: CustomerState = {
    customers: [],
    isFetching: false,
    errors: []
};

export default function customerReducer(
    state = initialState,
    action: CustomerActionTypes): CustomerState {
    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, {
                    id: state.customers.reduce((maxId, customer) => Math.max(customer.id, maxId), -1) + 1,
                    name: action.payload.name,
                    location: action.payload.location,
                    phone: action.payload.phone
                }]
            }

        case EDIT_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers.map(c => (c.id === action.payload.id) ? 
                    {
                        ...c,   
                        name: action.payload.customer.name,
                        location: action.payload.customer.location,
                        phone: action.payload.customer.phone
                    } 
                    : c)
                ]
            }

        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers
                    .filter(c => (c.id !== action.payload))
                    .map((x, index) => ({ ...x, id: index }))
                ]
            }

        case FETCH_CUSTOMERS:
            return {
                ...state,
                isFetching: true,
            }

        case FETCH_CUSTOMERS_SUCCEEDED:
            return {...state, 
                customers: action.payload,
                isFetching: false
            }

        case FETCH_CUSTOMERS_FAILED:
            return {
                ...state, 
                errors: [...state.errors, action.payload]
            }

        default: return state
    }
}