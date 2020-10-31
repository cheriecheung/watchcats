import React from 'react';
import { ImageContainer, SummaryCard } from '../../../components/ProfileComponents';
import moment from 'moment';

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ ownerInfo }) {
  return (
    <SummaryCard
      style={{
        display: 'inline-table',
        flexBasis: '35%',
        // maxHeight: 400,
        position: 'sticky',
        top: 20,
      }}
    >
      <h4>
        {ownerInfo.firstName} {ownerInfo.lastName}
      </h4>
      <ImageContainer>
        <img
          src={`${REACT_APP_API_DOMAIN}/image/${ownerInfo.profilePictureFileName}`}
          alt="pic"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </ImageContainer>

      <hr />
      <h6>Verified</h6>
      <hr />

      <h6>Sitter needed:</h6>
      <AppointmentTime oneDay={ownerInfo.bookingOneDay} overnight={ownerInfo.bookingOvernight} />
    </SummaryCard>
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
