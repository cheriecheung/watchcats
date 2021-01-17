import moment from 'moment';

export function calculateNetProfit(grossAmount) {
  const netAmount = (grossAmount * 0.8).toFixed(1);
  return netAmount
}

export function calculateHourlyRate(startTime, endTime, pricePerHour) {
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

export function calculateNightlyRate(startDate, endDate, pricePerNight) {
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
