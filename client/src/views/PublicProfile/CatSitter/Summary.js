import React from 'react';
import { ContainedButton } from '../../../components/UIComponents';
import { Image, ImageContainer, ProfileStats, VerticalCard } from '../../../components/UIComponents'
import RequestBookingModal from './RequestBookingModal';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ t, sitterInfo, summaryProps }) {
  const {
    modalVisible,
    setModalVisible,
    onSendMessage,
    profileActionStatus,
  } = summaryProps;

  const {
    firstName,
    lastName,
    profilePicture,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    hourlyRate,
    nightlyRate
  } = sitterInfo

  const pictureUrl = profilePicture ? `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  return (
    <VerticalCard
      style={{
        flexBasis: '35%',
        maxHeight: 400,
        position: 'sticky',
        top: 20,
      }}
    >
      {firstName && lastName &&
        <h4>{firstName} {lastName.charAt(0)}</h4>
      }

      <ImageContainer>
        <Image url={pictureUrl} />
      </ImageContainer>

      <br />

      <ProfileStats
        totalReviews={totalReviews}
        totalCompletedBookings={totalCompletedBookings}
        totalRepeatedCustomers={totalRepeatedCustomers}
      />

      <hr />
      <h6>Verified</h6>
      <hr />

      <span style={{ display: 'flex' }}>
        <h5>€ {hourlyRate} </h5>per day
        {/* you will receive ___  */}
      </span>

      <span style={{ display: 'flex' }}>
        <h5>€ {nightlyRate}</h5> per night
        {/* you will receive ___  */}
      </span>

      <ContainedButton onClick={onSendMessage}>{t('sitter_profile.send_message')}</ContainedButton>
      <ContainedButton onClick={() => setModalVisible(true)}>
        {t('sitter_profile.request_appointment')}
      </ContainedButton>

      <RequestBookingModal
        t={t}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        profileActionStatus={profileActionStatus}
      />
    </VerticalCard>
  );
}

export default Summary;