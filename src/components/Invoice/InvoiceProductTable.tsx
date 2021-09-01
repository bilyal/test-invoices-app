import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Table from 'react-bootstrap/Table';
import {CustomerProduct} from '../../store/types/invoiceTypes'
import QuantityInput from './QuantityInput'



interface InvoiceProductProps{
  products: CustomerProduct[],
  removeProduct: (id: number) => void,
  setQuantity: (id: number, quantity: number) => void
}

const InvoiceProductTable: React.FC<InvoiceProductProps> = ({ products, setQuantity, removeProduct}) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <QuantityInput product={product} setQuantity={setQuantity}/>
                </td>
                <td>
                  <Nav>
                    <NavLink onClick={() => removeProduct(product.id)}>delete</NavLink>
                  </Nav>
                </td>
              </tr>
            )
          }))
        }
      </tbody>
    </Table>
  )
}

export default InvoiceProductTable