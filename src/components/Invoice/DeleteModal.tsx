import React, {Dispatch} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {Invoice, InvoiceActionTypes} from '../../store/types/invoiceTypes'
import {deleteInvoice} from '../../store/actions/invoiceActions'

interface DeleteModalProps{
    isOpen: boolean,
    invoice: Invoice,
    closeModal: () => void,
    deleteInvoice: (id: number) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({isOpen, invoice, closeModal, deleteInvoice}) => {

    const handleDelete = (deleteId: number) => {
        deleteInvoice(deleteId);
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
                Are you sure?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" onClick={() => handleDelete(invoice.id)}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch : Dispatch<InvoiceActionTypes>) => ({
    deleteInvoice: (id: number) => dispatch(deleteInvoice(id))
  })

export default connect(null, mapDispatchToProps)(DeleteModal)