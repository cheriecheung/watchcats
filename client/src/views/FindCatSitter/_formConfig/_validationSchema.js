import * as yup from 'yup';
import { isDate } from "date-fns";

const dateOrderError = () => "form_error.date_order"

function parseDateString(value, originalValue) {
  if (!originalValue) return null;

  const parsedDate = isDate(originalValue)
    ? originalValue
    : new Date(originalValue);

  return parsedDate;
}

export const find_cat_sitter_schema = yup.object().shape({
  googlePlaceAddress: yup.string(),
  startDate: yup.mixed().transform(parseDateString).nullable().when('endDate', {
    is: endDate => endDate,
    then: yup.date()
      .transform(parseDateString)
  }),
  endDate: yup.mixed().nullable().when('startDate', {
    is: startDate => startDate,
    then: yup.date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), dateOrderError)
  }),
  sortBy: yup.object().shape({
    value: yup.string(),
    label: yup.string(),
  }),
}, [['startDate', 'endDate']])