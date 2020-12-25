import React from 'react';
import { Image, ImageContainer, ProfileStats, VerticalCard } from '../../../components/UIComponents'
import moment from 'moment';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ t, ownerInfo }) {
  const {
    firstName,
    lastName,
    profilePicture,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    bookingOneDay,
    bookingOvernight
  } = ownerInfo

  const pictureUrl = profilePicture ? `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  return (
    <VerticalCard variant="profileSummary">
      <h4>{firstName} {lastName && lastName.charAt(0)}</h4>

      <ImageContainer>
        <Image url={pictureUrl} />
      </ImageContainer>

      <br />

      <ProfileStats
        type="owner"
        totalReviews={totalReviews}
        totalCompletedBookings={totalCompletedBookings}
        totalRepeatedCustomers={totalRepeatedCustomers}
      />

      <hr />
      <h6>Verified</h6>

      {(Array.isArray(bookingOneDay) && bookingOneDay.length > 0) ||
        Array.isArray(bookingOvernight) && bookingOvernight.length > 0 &&
        <>
          <hr />
          <h6>Sitter needed:</h6>
          <AppointmentTime oneDay={bookingOneDay} overnight={bookingOvernight} />
        </>
      }
    </VerticalCard>
  );
}

export default Summary;

function AppointmentTime({ oneDay, overnight }) {
  return (
    <>
      {Array.isArray(oneDay) && oneDay.length > 0 && (
        <>
          <h6>One-day appointment: </h6>

          {oneDay.map(({ id, date, endTime, startTime }) => {
            const dateConverted = moment(date).format('DD MMM YYYY');
            const startTimeObj = moment(startTime).format('HH:mm');
            const endTimeObj = moment(endTime).format('HH:mm');

            return (
              <span style={{ display: 'flex' }} key={id}>
                <h5>
                  {dateConverted}, {startTimeObj} - {endTimeObj}
                </h5>
              </span>
            );
          })}
        </>
      )}

      {Array.isArray(overnight) && overnight.length > 0 && (
        <>
          <h6>Overnight appointment: </h6>

          {overnight.map(({ id, startDate, endDate }) => {
            const startDateConverted = moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY');
            const endDateConverted = moment(endDate, 'YYYY-MM-DD').format('DD MMM YYYY');

            return (
              <span style={{ display: 'flex' }} key={id}>
                <h5>
                  {startDateConverted} - {endDateConverted}
                </h5>
              </span>
            );
          })}
        </>
      )}
    </>
  );
}
