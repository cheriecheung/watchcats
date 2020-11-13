import React from 'react';
import ThemeButton from '../../../components/General/ThemeButton';
import { ImageContainer, SummaryCard } from '../../../components/ProfileComponents';
import RequestBookingModal from './RequestBookingModal';
import { useTranslation } from 'react-i18next';

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ sitterInfo, summaryProps }) {
  const { t } = useTranslation();

  const {
    modalVisible,
    setModalVisible,
    onSendMessage,
    onSendRequest,
    error,
    appointmentTime
  } = summaryProps;

  return (
    <SummaryCard
      style={{
        flexBasis: '35%',
        maxHeight: 400,
        position: 'sticky',
        top: 20,
      }}
    >
      <h4>
        {sitterInfo.firstName} {sitterInfo.lastName}
      </h4>
      <ImageContainer>
        <img
          src={`${REACT_APP_API_DOMAIN}/image/${sitterInfo.profilePictureFileName}`}
          alt="pic"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </ImageContainer>

      <hr />
      <h6>Verified</h6>
      <hr />

      <span style={{ display: 'flex' }}>
        <h5>€ {sitterInfo.hourlyRate} </h5>per day
        {/* you will receive ___  */}
      </span>

      <span style={{ display: 'flex' }}>
        <h5>€ {sitterInfo.nightlyRate}</h5> per night
        {/* you will receive ___  */}
      </span>

      <ThemeButton onClick={onSendMessage}>{t('sitter_profile.send_message')}</ThemeButton>
      <ThemeButton onClick={() => setModalVisible(true)}>
        {t('sitter_profile.request_appointment')}
      </ThemeButton>

      <RequestBookingModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        error={error}
        appointmentTime={appointmentTime}
        oneDayPrice={sitterInfo.hourlyRate}
        overnightPrice={sitterInfo.nightlyRate}
        // location={location}
        onSendRequest={onSendRequest}
      />
    </SummaryCard>
  );
}

export default Summary;