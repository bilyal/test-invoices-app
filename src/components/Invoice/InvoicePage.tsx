import React, {useState} from 'react';
import Page from '../common/Page';
import PageHeader from '../common/PageHeader';
import DeleteModal from './DeleteModal';
import { InvoiceState } from '../../store/types/invoiceTypes';
import PageTable from '../common/PageTable';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'
import EditModal from './EditModal';

const InvoicePage: React.FC<InvoiceState> = ({invoices}) => {

  const [id, setId] = useState(0);
  const [onAdding, setOnAdding] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  const [onDeleting, setOnDeleting] = useState(false);
  const [addModalOpen, setAddShow] = useState(false);
  const [editModalOpen, setEditShow] = useState(false);
  const [deleteModalOpen, setDeleteShow] = useState(false);
  
  const showAddModal = () => {
    setOnAdding(true);
    setAddShow(true);
  }

  const closeAddModal = () => {
    setOnAdding(false);
    setAddShow(false);
  }

  const showEditModal = (id : number) => {
    setId(id);
    setOnEditing(true);
    setEditShow(true);
  }

  const closeEditModal = () => {
    setOnEditing(false);
    setEditShow(false);
  }

  const showDeleteModal = (editId: number) => {
    setId(editId);
    setOnDeleting(true);
    setDeleteShow(true);
  }

  const closeDeleteModal = () => {
    setOnDeleting(false);
    setDeleteShow(false);
  }

  const tableHead = (
    <tr>
      <th>#</th>
      <th>Invoice</th>
      <th>Discount</th>
      <th>Total</th>
      <th></th>
    </tr>
  );

  const tableRows = (
    invoices.map(invoice => {
      return (
        <tr key={invoice.id}>
          <td>{invoice.id + 1}</td>
          <td>{invoice.customer.name}</td>
          <td>{invoice.discount}</td>
          <td>{invoice.total.toFixed(2)}</td>
          <td>
            <Nav>
              <NavLink onClick={() => showEditModal(invoice.id)}>edit</NavLink>
              <NavLink onClick={() => showDeleteModal(invoice.id)}>delete</NavLink>
            </Nav>
          </td>
        </tr>
      )
    })
  )

  return (
    <Page
      empty={invoices.length === 0}
      onAdding={onAdding} onEditing={onEditing} onDeleting={onDeleting}
      Header={<PageHeader pageName="Invoice" showAddModal={showAddModal}/>}
      DataTable={<PageTable tableHead={tableHead} tableRows={tableRows}/>}
      AddModal={<EditModal type="Add" isOpen={addModalOpen} closeModal={closeAddModal} invoice={invoices[id]} />}
      EditModal={<EditModal type="Edit" isOpen={editModalOpen} closeModal={closeEditModal} invoice={invoices[id]}/>}
      DeleteModal={<DeleteModal isOpen={deleteModalOpen} invoice={invoices[id]} closeModal={closeDeleteModal}/>}
    />
  );
}

export default InvoicePage;