import React, { useState, useEffect } from 'react';
import Page from '../common/Page';
import PageHeader from '../common/PageHeader';
import DeleteModal from './DeleteModal';
import { Customer } from '../../store/types/customerTypes';
import PageTable from '../common/PageTable';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'
import EditModal from './EditModal';

interface CustomerPageProps {
  customers: Customer[],
  fetchCustomers: () => void
}

export const CustomerPage: React.FC<CustomerPageProps> = ({ customers, fetchCustomers }) => {

  const [id, setId] = useState(0);
  const [onAdding, setOnAdding] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  const [onDeleting, setOnDeleting] = useState(false);
  const [addModalOpen, setAddShow] = useState(false);
  const [editModalOpen, setEditShow] = useState(false);
  const [deleteModalOpen, setDeleteShow] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        fetchCustomers();
      } catch (e) {
        console.log(e);
      }
    };
    getCustomers();
  }, []);

  const showAddModal = () => {
    setOnAdding(true);
    setAddShow(true);
  }

  const closeAddModal = () => {
    setOnAdding(false);
    setAddShow(false);
  }

  const showEditModal = (id: number) => {
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
      <th>Name</th>
      <th>Location</th>
      <th>Phone</th>
      <th></th>
    </tr>
  );

  const tableRows = (
    customers.map(customer => {
      return (
        <tr key={customer.id}>
          <td>{customer.id + 1}</td>
          <td>{customer.name}</td>
          <td>{customer.location}</td>
          <td>{customer.phone}</td>
          <td>
            <Nav>
              <NavLink onClick={() => showEditModal(customer.id)}>edit</NavLink>
              <NavLink onClick={() => showDeleteModal(customer.id)}>delete</NavLink>
            </Nav>
          </td>
        </tr>
      )
    })
  )

  return (
    <Page
      empty={customers.length === 0}
      onAdding={onAdding} onEditing={onEditing} onDeleting={onDeleting}
      Header={<PageHeader pageName="Customer" showAddModal={showAddModal} />}
      DataTable={<PageTable tableHead={tableHead} tableRows={tableRows} />}
      AddModal={<EditModal type="Add" isOpen={addModalOpen} closeModal={closeAddModal} customer={customers[id]} />}
      EditModal={<EditModal type="Edit" isOpen={editModalOpen} closeModal={closeEditModal} customer={customers[id]} />}
      DeleteModal={<DeleteModal isOpen={deleteModalOpen} customer={customers[id]} closeModal={closeDeleteModal} />}
    />
  );
}



export default CustomerPage;