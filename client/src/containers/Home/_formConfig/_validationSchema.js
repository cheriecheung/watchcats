import * as yup from 'yup';
import { isDate } from "date-fns";

const defaultError = () => "Required field";
const dateOrderError = () => "End date must be after start date"

function parseDateString(value, originalValue) {
  if (!originalValue) return null;

  const parsedDate = isDate(originalValue)
    ? originalValue
    : new Date(originalValue);

  return parsedDate;
}

export const home_search_schema = yup.object().shape({
  googlePlaceAddress: yup.string().required('Fill in an address or postcode'),
  startDate: yup.date().transform(parseDateString)
    .required(defaultError)
    .typeError(defaultError),
  endDate: yup.date().transform(parseDateString)
    .min(yup.ref('startDate'), dateOrderError)
    .required(defaultError)
    .typeError(defaultError)
})