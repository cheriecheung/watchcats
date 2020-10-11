import * as yup from 'yup';

const defaultError = () => "Required field";

export const general_schema = yup.object().shape({
    firstName: yup.string().required(defaultError),
    lastName: yup.string().required(defaultError),
    // matches() for phone
    phone: yup.string().required(),
    address: yup.string().required(),
    postcode: yup.string().required("Invalid dutch passport").matches(/^\d{4}[a-z]{2}$/i),
})
