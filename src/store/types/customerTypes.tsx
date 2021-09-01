export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS'
export const FETCH_CUSTOMERS_SUCCEEDED = 'FETCH_CUSTOMERS_SUCCEEDED'
export const FETCH_CUSTOMERS_FAILED = 'FETCH_CUSTOMERS_FAILED'
export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER'
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER'
export const SET_CUSTOMER_TABLE_DATA = 'SET_CUSTOMER_TABLE_DATA'

export interface CustomerDto{
  name: string,
  location: string,
  phone: string
}

export interface Customer extends CustomerDto{
  id: number
}

export interface CustomerState {
  customers: Customer[],
  isFetching: boolean,
  errors: string[]
}

export interface fetchCustomersAction {
  type: typeof FETCH_CUSTOMERS
}

export interface fetchCustomersSucceededAction {
  type: typeof FETCH_CUSTOMERS_SUCCEEDED,
  payload: Customer[]
}

export interface fetchCustomersFailedAction {
  type: typeof FETCH_CUSTOMERS_FAILED,
  payload: string
}

export interface addCustomerAction {
  type: typeof ADD_CUSTOMER,
  payload: CustomerDto
}

export interface editCustomerAction {
  type: typeof EDIT_CUSTOMER,
  payload: {
    id: number
    customer: CustomerDto
  }
}

export interface deleteCustomerAction {
  type: typeof DELETE_CUSTOMER,
  payload: number 
}

export type CustomerActionTypes = addCustomerAction 
                                | editCustomerAction 
                                | deleteCustomerAction 
                                | fetchCustomersAction
                                | fetchCustomersSucceededAction
                                | fetchCustomersFailedAction

