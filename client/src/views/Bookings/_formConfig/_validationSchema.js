import * as yup from 'yup';
import translationKeys from '../../../constants/translationKeys'

const { field_required, review_length } = translationKeys

export const review_schema = yup.object().shape({
  // min and max word count
  review: yup.string()
    .required(field_required)
    .min(10, review_length),
  rating: yup.number()
    .positive(field_required)
    .integer(field_required)
    .required(field_required)
})