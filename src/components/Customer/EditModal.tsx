import React, {Dispatch} from 'react'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from "yup";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {Customer, CustomerActionTypes, CustomerDto} from '../../store/types/customerTypes'
import {addCustomer, editCustomer} from '../../store/actions/customerActions'

interface ModalProps{
    isOpen: boolean,
    type: string,
    customer: Customer,
    closeModal: () => void,
    addCustomer: (newCustomer: CustomerDto) => void,
    editCustomer: (id: number, newCustomer: CustomerDto) => void
}

const EditModal: React.FC<ModalProps> = ({ isOpen, closeModal, type, addCustomer, editCustomer, customer }) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Formik
        initialValues={{
          name: (type === "Add") ? '' : customer.name,
          location: (type === "Add") ? '' : customer.location,
          phone: (type === "Add") ? '' : customer.phone,
        }}
        onSubmit={values => {
          switch (type) {
            case "Add": {
              addCustomer({
                name: values.name,
                location: values.location,
                phone: values.phone
              });
              closeModal();
              break;
            }

            case "Edit": {
              editCustomer(customer.id, {
                name: values.name,
                location: values.location,
                phone: values.phone
              });
              closeModal();
              break;
            }
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          location: Yup.string().required("Required"),
          phone: Yup.string().required("Required")
          .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 
          "Phone number is not valid")
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
                <Modal.Title>{type} Customer</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name" placeholder="Enter name" value={values.name}
                    onChange={handleChange} onBlur={handleBlur}
                    className={errors.name && touched.name ? "text-input error" : "text-input"}
                  />
                  {errors.name && touched.name && (<div className="input-feedback">{errors.name}</div>)}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location" placeholder="Enter location" value={values.location}
                    onChange={handleChange} onBlur={handleBlur}
                    className={errors.location && touched.location ? "text-input error" : "text-input"}
                  />
                  {errors.location && touched.location && (<div className="input-feedback">{errors.location}</div>)}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone" placeholder="Enter phone" value={values.phone}
                    onChange={handleChange} onBlur={handleBlur}
                    className={errors.phone && touched.phone ? "text-input error" : "text-input"}
                  />
                  {errors.phone && touched.phone && (<div className="input-feedback">{errors.phone}</div>)}
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

const mapDispatchToProps = (dispatch : Dispatch<CustomerActionTypes>) => ({
    addCustomer: (newCustomer: CustomerDto) => dispatch(addCustomer(newCustomer)),
    editCustomer: (id: number, newCustomer: CustomerDto) => dispatch(editCustomer(id, newCustomer))
  })

export default connect(null, mapDispatchToProps)(EditModal)