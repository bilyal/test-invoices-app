import React, {Dispatch} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {Product, ProductActionTypes} from '../../store/types/productTypes'
import {deleteProduct} from '../../store/actions/productActions'

interface DeleteModalProps{
    isOpen: boolean,
    product: Product,
    closeModal: () => void,
    deleteProduct: (id: number) => void
}

const DeleteProductModal: React.FC<DeleteModalProps> = ({isOpen, product, closeModal, deleteProduct}) => {

    const handleDelete = (deleteId: number) => {
        deleteProduct(deleteId);
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
                <p>Product: {product.name}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" onClick={() => handleDelete(product.id)}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch : Dispatch<ProductActionTypes>) => ({
    deleteProduct: (id: number) => dispatch(deleteProduct(id))
  })

export default connect(null, mapDispatchToProps)(DeleteProductModal)