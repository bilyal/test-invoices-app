import {CustomerDto, 
        ADD_CUSTOMER, addCustomerAction,
        EDIT_CUSTOMER, editCustomerAction,
        DELETE_CUSTOMER, deleteCustomerAction,
        FETCH_CUSTOMERS, fetchCustomersAction} from '../types/customerTypes';

export function addCustomer(newCustomer: CustomerDto) : addCustomerAction{
    return {
        type: ADD_CUSTOMER,
        payload: newCustomer
    }
}

export function editCustomer(customerId: number, newCustomerData: CustomerDto) : editCustomerAction{
    return {
        type: EDIT_CUSTOMER,
        payload: {
            id: customerId,
            customer: newCustomerData
        }
    }
}

export function deleteCustomer(customerId: number) : deleteCustomerAction{
    return {
        type: DELETE_CUSTOMER,
        payload: customerId
    }
}

export function fetchCustomers() : fetchCustomersAction{
    return {
        type: FETCH_CUSTOMERS
    }
}