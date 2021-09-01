import {Customer} from './customerTypes';
import {Product} from './productTypes';

export const ADD_INVOICE = 'ADD_INVOICE'
export const EDIT_INVOICE = 'EDIT_invoice'
export const DELETE_INVOICE = 'DELETE_INVOICE'

export interface CustomerProduct extends Product{
  quantity: number
}

export interface InvoiceDto {
  discount: number,
  productList: CustomerProduct[],
  total: number,
  customer: Customer
}

export interface Invoice extends InvoiceDto{
    id: number
}

export interface InvoiceState{
    invoices: Invoice[]
    
}

export interface addInvoiceAction {
  type: typeof ADD_INVOICE,
  payload: InvoiceDto
}

export interface editInvoiceAction {
  type: typeof EDIT_INVOICE,
  payload: {
    id: number
    invoice: InvoiceDto
  }
}

export interface deleteInvoiceAction {
  type: typeof DELETE_INVOICE,
  payload: number 
}

export type InvoiceActionTypes = addInvoiceAction | editInvoiceAction | deleteInvoiceAction