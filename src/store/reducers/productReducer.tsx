import {ProductState, ProductActionTypes, 
        ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT,
        FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCEEDED, FETCH_PRODUCTS_FAILED} from '../types/productTypes';

const initialState: ProductState = {
    products: [],
    isFetching: false,
    errors: []
};

export function productReducer(
    state = initialState,
    action: ProductActionTypes): ProductState {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state, 
                products: [...state.products, {
                    id: state.products.reduce((maxId, product) => Math.max(product.id, maxId), -1) + 1,
                    name: action.payload.name,
                    price: action.payload.price
                }]
            }

        case EDIT_PRODUCT:
            return {
                ...state,
                products: [...state.products.map(p => (p.id === action.payload.id) ? 
                    {
                        ...p,   
                        name: action.payload.product.name,
                        price: action.payload.product.price,
                    } 
                    : p)
                ]
            }    

        case DELETE_PRODUCT:
            return {
                ...state,
                products: [...state.products
                    .filter(p => (p.id !== action.payload))
                    .map((x, index) => ({...x, id: index}))
                ]
            }

        case FETCH_PRODUCTS:
            return {
                ...state,
                isFetching: true,
            }

        case FETCH_PRODUCTS_SUCCEEDED:
            return {
                ...state,
                products: action.payload,
                isFetching: false
            }

        case FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                errors: [...state.errors, action.payload]
            }

        default: return state
    }
}