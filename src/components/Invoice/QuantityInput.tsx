import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import { CustomerProduct } from '../../store/types/invoiceTypes';

interface QuantityInputProps {
    product: CustomerProduct,
    setQuantity: (id: number, quantity: number) => void
}

const QuantityInput: React.FC<QuantityInputProps> = ({ product, setQuantity }) => {
  
    return (
        <Formik
            enableReinitialize
            initialValues={{
                quantity: product.quantity
            }}
            validationSchema={Yup.object().shape({
                quantity: Yup.number().typeError("Quantity must be a number")
                    .required("Required")
                    .positive("Quantity value must be positive")
                    .integer("Quantity value must be integer")
            })}
            onSubmit={() => { }}
        >
            {
                props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;

                    return (
                        <Form onSubmit={handleSubmit}>
                            <Form.Control name="quantity" value={values.quantity.toString()}
                                onChange={handleChange}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                    handleBlur(e);
                                    if (!errors.quantity) setQuantity(product.id, values.quantity);
                                }}
                                className={errors.quantity && touched.quantity ? "col-sm-2 error" : "col-sm-2"}
                            />
                            {errors.quantity && touched.quantity && (<div className="input-feedback">{errors.quantity}</div>)}
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default QuantityInput