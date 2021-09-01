import {InvoiceDto,
        ADD_INVOICE, addInvoiceAction,
        EDIT_INVOICE, editInvoiceAction,
        DELETE_INVOICE, deleteInvoiceAction} from '../types/invoiceTypes';

export function addInvoice(newInvoice: InvoiceDto) : addInvoiceAction{
    return {
        type: ADD_INVOICE,
        payload: newInvoice
    }
}

export function editInvoice(invoiceId: number, newInvoiceData: InvoiceDto) : editInvoiceAction{
    return {
        type: EDIT_INVOICE,
        payload: {
            id: invoiceId,
            invoice: newInvoiceData
        }
    }
}

export function deleteInvoice(invoiceId: number) : deleteInvoiceAction{
    return {
        type: DELETE_INVOICE,
        payload: invoiceId
    }
}