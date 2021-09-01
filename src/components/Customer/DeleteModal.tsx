import React, {Dispatch} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {Customer, CustomerActionTypes} from '../../store/types/customerTypes'
import {deleteCustomer} from '../../store/actions/customerActions'

interface DeleteModalProps{
    isOpen: boolean,
    customer: Customer,
    closeModal: () => void,
    deleteCustomer: (id: number) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({isOpen, customer, closeModal, deleteCustomer}) => {

    const handleDelete = (deleteId: number) => {
        deleteCustomer(deleteId);
        closeModal();
      }

    return (
        <Modal size="sm" show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p>Customer: {customer.name}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" onClick={() => handleDelete(customer.id)}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch : Dispatch<CustomerActionTypes>) => ({
    deleteCustomer: (id: number) => dispatch(deleteCustomer(id))
  })

export default connect(null, mapDispatchToProps)(DeleteModal)