import moment from 'moment';

export function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1).toString()
}

export function formatDate(date, formatType = 'YYYY-MM-DD') {
  return moment(date).format(formatType)
}

export function formatTime(time) {
  return moment(time).format('HH:mm')
}

export function getErrorProperties(name, errors) {
  let hasError, message;

  // in field array, name = arrayName[index].fieldName
  // in single field, name = name

  if (name.includes('[') && name.includes(']')) {
    const regex = /[\d]/g;
    const index = name.match(regex);
    const arrayName = name.substr(0, name.indexOf('['));
    const fieldName = name.substr(name.indexOf(".") + 1);

    const error = errors[arrayName]
    hasError =
      error &&
      error[index] &&
      error[index].hasOwnProperty(fieldName)
    message =
      error &&
      error[index] &&
      error[index][fieldName] &&
      error[index][fieldName].message || 'form_error.field_required'
  } else {
    const error = errors[name]
    hasError = error
    message = error && error.message || 'form_error.field_required'
  }

  return { hasError, message }
}