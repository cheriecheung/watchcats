import * as yup from 'yup';
import regex from '../../../constants/regex'
import translationKeys from '../../../constants/translationKeys'

const { email_regex, password_regex } = regex;

const {
  field_required,
  email_format,
  same_old_password,
  new_passwords_unmatched,
  password_critera
} = translationKeys;

export const send_email_schema = yup.object().shape({
  email: yup.string()
    .required(field_required)
    .matches(email_regex, email_format)
})

export const login_schema = yup.object().shape({
  email: yup.string()
    .required(field_required)
    .matches(email_regex, email_format),
  password: yup.string()
    .required(field_required)
})

export const password_reset_schema = yup.object().shape({
  newPassword: yup.string()
    .matches(password_regex, password_critera)
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
    .matches(email_regex, email_format),
  password: yup.string()
    .matches(password_regex, password_critera)
    .required(field_required)
})