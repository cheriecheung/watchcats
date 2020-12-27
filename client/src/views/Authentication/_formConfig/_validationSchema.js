import * as yup from 'yup';

const defaultError = () => "Required field";

export const send_email_schema = yup.object().shape({
  email: yup.string()
    .required(defaultError)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
})

export const login_schema = yup.object().shape({
  email: yup.string()
    .required(defaultError)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
  password: yup.string().required(defaultError)
})

//https://github.com/jquense/yup/issues/345
//https://www.nuomiphp.com/eplan/en/34699.
export const password_reset_schema = yup.object().shape({
  // passwords must match, and fulfill password requirements
  newPassword: yup.string().required(defaultError)
    .notOneOf([yup.ref('currentPassword'), null], 'New password cannot be the same as current password'),
  newPasswordRepeat: yup.string().required(defaultError)
    .oneOf([yup.ref('newPassword'), null], "New passwords don't match")
})

export const register_schema = yup.object().shape({
  firstName: yup.string().required(defaultError),
  lastName: yup.string().required(defaultError),
  email: yup.string()
    .required(defaultError)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
  // matches() for password
  password: yup.string().required(defaultError)
})