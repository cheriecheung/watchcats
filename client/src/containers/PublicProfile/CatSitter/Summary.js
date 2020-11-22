import React from 'react';
import { ContainedButton } from '../../../components/UIComponents';
import { Image, ImageContainer, VerticalCard } from '../../../components/UIComponents'
import RequestBookingModal from './RequestBookingModal';
import { useTranslation } from 'react-i18next';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ sitterInfo, summaryProps }) {
  const { t } = useTranslation();

  const pictureUrl = sitterInfo.profilePictureFileName ? `${REACT_APP_API_DOMAIN}/image/${sitterInfo.profilePictureFileName}` : defaultProfilePic

  const {
    modalVisible,
    setModalVisible,
    onSendMessage,
    onSendRequest,
    error,
    appointmentTime
  } = summaryProps;

  return (
    <VerticalCard
      style={{
        flexBasis: '35%',
        maxHeight: 400,
        position: 'sticky',
        top: 20,
      }}
    >
      {sitterInfo &&
        sitterInfo.firstName &&
        sitterInfo.lastName &&
        <h4>{sitterInfo.firstName} {sitterInfo.lastName.charAt(0)}</h4>
      }

      <ImageContainer>
        <Image url={pictureUrl} />
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

      <ContainedButton onClick={onSendMessage}>{t('sitter_profile.send_message')}</ContainedButton>
      <ContainedButton onClick={() => setModalVisible(true)}>
        {t('sitter_profile.request_appointment')}
      </ContainedButton>

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
    </VerticalCard>
  );
}

export default Summary;