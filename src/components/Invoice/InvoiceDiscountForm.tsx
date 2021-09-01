import React from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from "yup";

interface DiscountFormProps{
    discount: number
    setDiscount: (discount: number) => void
}

const InvoiceDiscountForm: React.FC<DiscountFormProps> = ({discount, setDiscount}) => (
    <Formik
        enableReinitialize
        initialValues={{
            discount: discount
        }}
        validationSchema={Yup.object().shape({
            discount: Yup.number().typeError("Discount must be a number")
                .required("Required")
                .min(0, "Discount value must be between 0 and 75")
                .lessThan(75, "Discount value must be between 0 and 75")
                .integer("Discount value must be integer")
        })}
        onSubmit={() => {}}
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
                        <Form.Label htmlFor="discount">Discount (%)</Form.Label>
                        <Form.Control name="discount" placeholder={"Enter discount"} value={values.discount.toString()}
                            onChange={handleChange}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                handleBlur(e);
                                if (!errors.discount) setDiscount(values.discount);
                            }}
                            className={errors.discount && touched.discount ? "text-input error" : "text-input"}
                        />
                        {errors.discount && touched.discount && (<div className="input-feedback">{errors.discount}</div>)}
                    </Form>
                )
            }
        }
    </Formik>
) 

export default InvoiceDiscountForm;