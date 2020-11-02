import React, { useState, useEffect } from 'react';
import { getChatContacts, getChatConversation } from '../../../redux/actions/chatActions';
import { getAppointmentTime, sendRequest } from '../../../redux/actions/bookingActions';
import ThemeButton from '../../../components/General/ThemeButton';
import { ImageContainer, SummaryCard } from '../../../components/ProfileComponents';
import RequestBookingModal from './RequestBookingModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ id, sitterInfo }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { error: errorType, appointmentTime } = useSelector((state) => state.bookings);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSendMessage = () => {
    dispatch(getChatContacts);
    dispatch(getChatConversation);
  };

  const handleSendRequest = (data) => {
    const body = {
      ...data,
      sitterId: id,
    };
    dispatch(sendRequest(body));
  };

  useEffect(() => {
    if (modalVisible) {
      dispatch(getAppointmentTime());
    }
  }, [modalVisible]);

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

      <ThemeButton onClick={handleSendMessage}>{t('sitter_profile.send_message')}</ThemeButton>
      <ThemeButton onClick={() => setModalVisible(true)}>
        {t('sitter_profile.request_appointment')}
      </ThemeButton>

      <RequestBookingModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        error={errorType}
        appointmentTime={appointmentTime}
        oneDayPrice={sitterInfo.hourlyRate}
        overnightPrice={sitterInfo.nightlyRate}
        // location={location}
        handleSendRequest={handleSendRequest}
      />
    </SummaryCard>
  );
}

export default Summary;
