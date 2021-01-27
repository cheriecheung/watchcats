import React from 'react';
import { ContainedButton, LinkButton, OutlinedButton } from '../../../components/UIComponents';
import {
  Image,
  ImageContainer,
  PriceDisplay,
  ProfileStats,
  VerticalCard
} from '../../../components/UIComponents'
import RequestBookingModal from './RequestBookingModal';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ t, sitterInfo, summaryProps }) {
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

  const {
    modalVisible,
    setModalVisible,
    onSendMessage,
    profileActionStatus,
    isViewingOwnProfile
  } = summaryProps;

  const pictureUrl = profilePicture ?
    `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  return (
    <VerticalCard variant="profileSummary">
      <h4>{firstName} {lastName && lastName.charAt(0)}</h4>

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

      <div style={{ display: 'flex', margin: '25px 0' }}>
        <PriceDisplay rate={hourlyRate} rateType="hourly" />
        <div style={{ width: 1, height: 35, background: '#ECECEC', margin: '0 20px' }} />
        <PriceDisplay rate={nightlyRate} rateType="nightly" />
      </div>

      <OutlinedButton
        onClick={onSendMessage}
        disabled={isViewingOwnProfile}
        style={{ marginBottom: 10 }}
      >
        {t('sitter_profile.send_message')}
      </OutlinedButton>
      <br />
      <ContainedButton
        onClick={() => setModalVisible(true)}
        disabled={isViewingOwnProfile}
      >
        {t('sitter_profile.request_appointment')}
      </ContainedButton>
      {isViewingOwnProfile &&
        <p>({t('sitter_profile.no_own_profile_action')})</p>
      }

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