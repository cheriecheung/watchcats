import moment from 'moment';

export function calculateOneDayPrice(startTime, endTime, pricePerHour) {
  const startTimeObj = moment(startTime, 'HH:mm');
  const endTimeObj = moment(endTime, 'HH:mm');

  const totalHours = moment.duration(endTimeObj.diff(startTimeObj)).asHours();
  const roundUpTotalHours = Math.ceil(totalHours);

  if (roundUpTotalHours < 1) {
    alert('End time cannot happen before start time!');
    return 'To be calculated';
  } else {
    const calculatePrice = roundUpTotalHours * pricePerHour;
    return `€ ${calculatePrice}, 00`;
  }
}

export function calculateOvernightPrice(startDate, endDate, pricePerNight) {
  const startDateObj = moment(startDate, 'YYYY-MM-DD');
  const endDateObj = moment(endDate, 'YYYY-MM-DD');

  const totalNights = moment.duration(endDateObj.diff(startDateObj)).asDays();

  if (totalNights < 1) {
    alert('End date cannot happen before start date!');
    return 'To be calculated';
  } else {
    const calculatePrice = totalNights * pricePerNight;
    return `€ ${calculatePrice}, 00`;
  }
}
