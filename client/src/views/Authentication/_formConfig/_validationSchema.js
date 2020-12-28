import * as yup from 'yup';
import translationKeys from '../../../constants/translationKeys'

const {
  field_required,
  email_format,
  same_old_password,
  new_passwords_unmatched
} = translationKeys

export const send_email_schema = yup.object().shape({
  email: yup.string()
    .required(field_required)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, email_format)
})

export const login_schema = yup.object().shape({
  email: yup.string()
    .required(field_required)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, email_format),
  password: yup.string()
    .required(field_required)
})

//https://github.com/jquense/yup/issues/345
//https://www.nuomiphp.com/eplan/en/34699.
export const password_reset_schema = yup.object().shape({
  // passwords must match, and fulfill password requirements
  newPassword: yup.string()
    .required(field_required)
    .notOneOf([yup.ref('currentPassword'), null], same_old_password),
  newPasswordRepeat: yup.string()
    .required(field_required)
    .oneOf([yup.ref('newPassword'), null], new_passwords_unmatched)
})

export const register_schema = yup.object().shape({
  firstName: yup.string().required(field_required),
  lastName: yup.string().required(field_required),
  email: yup.string()
    .required(field_required)
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, email_format),
  // matches() for password
  password: yup.string().required(field_required)
})