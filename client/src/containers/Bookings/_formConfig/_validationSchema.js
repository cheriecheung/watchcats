import * as yup from 'yup';
const defaultError = () => "Required field";

export const review_schema = yup.object().shape({
  // min and max word count
  review: yup.string().required(defaultError).min(10, 'too short'),
  rating: yup.number().positive('Rating required').integer('Rating required').required(defaultError)
})