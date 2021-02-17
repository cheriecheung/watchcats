import * as yup from 'yup';
import { isDate } from "date-fns";
import translationKeys from '../../../constants/translationKeys'

const { address_required, date_order, field_required } = translationKeys

function parseDateString(value, originalValue) {
  if (!originalValue) return null;

  const parsedDate = isDate(originalValue)
    ? originalValue
    : new Date(originalValue);

  return parsedDate;
}

export const home_search_schema = yup.object().shape({
  googlePlaceAddress: yup.string().required(address_required),
  startDate: yup.mixed()
    .transform(parseDateString)
    .nullable()
    .when('endDate', {
      is: endDate => endDate,
      then: yup.date()
        .transform(parseDateString)
        .required(field_required)
    }),
  endDate: yup.mixed()
    .nullable()
    .when('startDate', {
      is: startDate => startDate,
      then: yup.date()
        .transform(parseDateString)
        .min(yup.ref('startDate'), date_order)
        .required(field_required)
    }),
}, [['startDate', 'endDate']])