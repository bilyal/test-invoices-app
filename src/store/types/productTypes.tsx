export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_PRODUCTS_SUCCEEDED = 'FETCH_PRODUCTS_SUCCEEDED'
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export interface ProductDto{
   name: string,
   price: number
}

export interface Product extends ProductDto{
    id: number
}

export interface ProductState{
    products: Product[],
    isFetching: boolean,
    errors: string[]
}

export interface fetchProductsAction {
  type: typeof FETCH_PRODUCTS
}

export interface fetchProductsSucceededAction {
  type: typeof FETCH_PRODUCTS_SUCCEEDED,
  payload: Product[]
}

export interface fetchProductsFailedAction {
  type: typeof FETCH_PRODUCTS_FAILED,
  payload: string
}


export interface addProductAction {
  type: typeof ADD_PRODUCT,
  payload: ProductDto
}

export interface editProductAction {
  type: typeof EDIT_PRODUCT,
  payload: {
    id: number
    product: ProductDto
  }
}

export interface deleteProductAction {
  type: typeof DELETE_PRODUCT,
  payload: number 
}

export type ProductActionTypes = addProductAction 
                                | editProductAction 
                                | deleteProductAction
                                | fetchProductsAction
                                | fetchProductsSucceededAction
                                | fetchProductsFailedAction
