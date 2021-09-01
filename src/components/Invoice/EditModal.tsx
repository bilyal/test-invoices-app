import React, {useState, Dispatch, useReducer} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux'
import { InvoiceDto, Invoice, CustomerProduct, InvoiceActionTypes } from '../../store/types/invoiceTypes';
import { addInvoice, editInvoice } from '../../store/actions/invoiceActions';
import {Customer} from '../../store/types/customerTypes'
import {Product} from '../../store/types/productTypes'
import FormGroup from 'react-bootstrap/FormGroup';
import {ADD, REMOVE, SET_DISCOUNT, SET_QUANTITY, CLEAR_TABLE, reducer} from './reducer'
import InvoiceDiscountForm from './InvoiceDiscountForm';
import InvoiceProductTable from './InvoiceProductTable';
import { AppState } from '../../store';

interface ModalProps{
  isOpen: boolean,
  type: string,
  customers: Customer[],
  products: Product[],
  invoice: Invoice,
  closeModal: () => void,
  addInvoice: (newInvoice: InvoiceDto) => void,
  editInvoice: (id: number, newInvoice: InvoiceDto) => void
}

const EditModal: React.FC<ModalProps> = ({isOpen, closeModal, type, customers, products, invoice, addInvoice, editInvoice}) => {

  const [customerId, setCustomerId] = useState(0);
  const [productId, setProductId] = useState(0);
  
  interface InvoiceProductState {
    items: CustomerProduct[],
    discount: number
    total: number
  }
  
  const initialInvoiceState: InvoiceProductState = {
    items: (type === "Add") ? [] : invoice.productList,
    discount: (type === "Add") ? 0 : invoice.discount,
    total: (type === "Add") ? 0 : invoice.total,
  }
  
  const [productList, dispatch] = useReducer(reducer, initialInvoiceState)

  const handleCustomerSelect = (e: any) => {
    setCustomerId(e.target.selectedIndex);
    dispatch({type: CLEAR_TABLE});
  } 
  
  const handleSubmit = () => {
    switch(type) {
      case "Add": {
        addInvoice({
          customer: customers[customerId],
          productList: productList.items,
          discount: productList.discount,
          total: productList.total
        })
        closeModal();
        break;
      }

      case "Edit": {
        editInvoice(invoice.id, {
          customer: customers[customerId],
          productList: productList.items,
          discount: productList.discount,
          total: productList.total
        })
        closeModal();
        break;
      }
    }
  }
  
  return (
    <Modal size="lg" show={isOpen} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{type} Invoice</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <InvoiceDiscountForm discount={(type === "Add") ? 0 : invoice.discount}
            setDiscount={(discount: number) => dispatch({ type: SET_DISCOUNT, discount: discount })} />

          <FormGroup>
            <Form.Label>Customer</Form.Label>
            <Form.Control as="select" onChange={handleCustomerSelect}>
              {
                customers.map((c: Customer) => {
                  return (
                    <option key={c.id}>{c.name}</option>)
                })
              }
            </Form.Control>
          </FormGroup>

          <FormGroup>
            <div className="mt-2 mb-2">
              <Form.Label>Add Product</Form.Label>
              <Button className="ml-2" variant="secondary" onClick={() => {
                dispatch({ type: ADD, product: { ...products[productId], quantity: 1 } });
              }}>
                Add
                    </Button>
            </div>
            <Form.Control as="select" onChange={(e: any) => setProductId(e.target.selectedIndex)}>
              {
                products.map(p => {
                  return (
                    <option key={p.id}>{p.name}</option>)
                })
              }
            </Form.Control>
          </FormGroup>

          {
            productList.items.length > 0 &&
            <InvoiceProductTable products={productList.items} removeProduct={(id: number) => dispatch({ type: REMOVE, product: productList.items[id] })}
              setQuantity={(id: number, quantity: number) => dispatch({ type: SET_QUANTITY, id: id, quantity: quantity })} />
          }
          <br />
          <h2>Total: {productList.total.toFixed(2)}</h2>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={(customers.length === 0)}>{type}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state: AppState) => ({
  customers: state.customer.customers,
  products: state.product.products
})

const mapDispatchToProps = (dispatch : Dispatch<InvoiceActionTypes>) => ({
  addInvoice: (newInvoice: InvoiceDto) => dispatch(addInvoice(newInvoice)),
  editInvoice: (id: number, newInvoice: InvoiceDto) => dispatch(editInvoice(id, newInvoice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)