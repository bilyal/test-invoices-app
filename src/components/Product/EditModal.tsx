import React, {Dispatch} from 'react'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from "yup";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {Product, ProductActionTypes, ProductDto} from '../../store/types/productTypes'
import {addProduct, editProduct} from '../../store/actions/productActions'

interface ModalProps{
    isOpen: boolean,
    type: string,
    product: Product,
    closeModal: () => void,
    addProduct: (newProduct: ProductDto) => void,
    editProduct: (id: number, newProduct: ProductDto) => void
}

const AddProductModal: React.FC<ModalProps> = ({ isOpen, closeModal, type, addProduct, editProduct, product }) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Formik
        initialValues={{
          name: (type === "Add") ? '' : product.name,
          price: (type === "Add") ? '' : product.price.toFixed(2),
        }}
        onSubmit={values => {
          switch (type) {
            case "Add": {
              addProduct({
                name: values.name,
                price: parseFloat(values.price)
              });
              closeModal();
              break;
            }

            case "Edit": {
              editProduct(product.id, {
                name: values.name,
                price: parseFloat(values.price)
              });
              closeModal();
              break;
            }
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          price: Yup.string().required("Required").matches(/^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/, "Price is not valid")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>{type} Product</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" placeholder="Enter name" value={values.name}
                      onChange={handleChange} onBlur={handleBlur}
                      className={errors.name && touched.name ? "text-input error" : "text-input"}
                    />
                    {errors.name && touched.name && (<div className="input-feedback">{errors.name}</div>)}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" placeholder="Enter price" value={values.price}
                      onChange={handleChange} onBlur={handleBlur}
                      className={errors.price && touched.price ? "text-input error" : "text-input"}
                    />
                    {errors.price && touched.price && (<div className="input-feedback">{errors.price}</div>)}
                  </Form.Group>
                </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>{type}</Button>
              </Modal.Footer>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch : Dispatch<ProductActionTypes>) => ({
    addProduct: (newProduct: ProductDto) => dispatch(addProduct(newProduct)),
    editProduct: (id: number, newProduct: ProductDto) => dispatch(editProduct(id, newProduct))
  })

export default connect(null, mapDispatchToProps)(AddProductModal)