import React from 'react';
import { Image, ImageContainer, VerticalCard } from '../../../components/UIComponents'
import moment from 'moment';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ t, ownerInfo }) {
  const pictureUrl = ownerInfo.profilePictureFileName ? `${REACT_APP_API_DOMAIN}/image/${ownerInfo.profilePictureFileName}` : defaultProfilePic

  return (
    <VerticalCard
      style={{
        display: 'inline-table',
        flexBasis: '35%',
        // maxHeight: 400,
        position: 'sticky',
        top: 20,
      }}
    >
      {ownerInfo &&
        ownerInfo.firstName &&
        ownerInfo.lastName &&
        <h4>{ownerInfo.firstName} {ownerInfo.lastName.charAt(0)}</h4>
      }

      <ImageContainer>
        <Image url={pictureUrl} />
      </ImageContainer>

      <hr />
      <h6>Verified</h6>
      <hr />

      <h6>Sitter needed:</h6>
      <AppointmentTime oneDay={ownerInfo.bookingOneDay} overnight={ownerInfo.bookingOvernight} />
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
