import moment from 'moment';

export function getErrorProperties(name, index, errors) {
  let error, hasError, message;

  if (typeof index === 'number') {
    const arrayName = name.substr(0, name.indexOf('['));
    const fieldName = name.substr(name.indexOf(".") + 1);

    error = errors[arrayName]
    hasError = error && error[index] && error[index].hasOwnProperty(fieldName)
    message =
      error &&
      error[index] &&
      error[index][fieldName] &&
      error[index][fieldName].message || 'Required field'
  } else {
    error = errors[name]
    hasError = error
    message = error && error.message || 'Required field'
  }

  return { error, hasError, message }
}

export function calculateOneDayPrice(startTime, endTime, pricePerHour) {
  const startTimeObj = moment(startTime);
  const endTimeObj = moment(endTime);

  const totalHours = moment.duration(endTimeObj.diff(startTimeObj)).asHours();
  const roundUpTotalHours = Math.ceil(totalHours);

  if (roundUpTotalHours < 1) {
    alert('End time cannot happen before start time!');
    return 'To be calculated';
  } else {
    const calculatePrice = roundUpTotalHours * pricePerHour;

    console.log({ calculatePrice, roundUpTotalHours, pricePerHour });
    return calculatePrice;
  }
}

export function calculateOvernightPrice(startDate, endDate, pricePerNight) {
  const startDateObj = moment(startDate);
  const endDateObj = moment(endDate);

  const totalNights = moment.duration(endDateObj.diff(startDateObj)).asDays();

  if (totalNights < 1) {
    alert('End date cannot happen before start date!');
    return 'To be calculated';
  } else {
    const calculatePrice = totalNights * pricePerNight;
    return calculatePrice;
  }
}
