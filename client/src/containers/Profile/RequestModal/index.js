import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { DatePicker, FieldLabel, TimePicker } from '../../../components/FormComponents';
import moment from 'moment';
import CreateAppointmentTime from './CreateAppointmentTime';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function RequestModal({ modalVisible, closeModal, error, appointmentTime, handleSendRequest }) {
  const { t } = useTranslation();

  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <Modal
      //  title=""
      visible={modalVisible}
      onOk={handleSendRequest}
      okText={t('sitter_profile.send_request')}
      onCancel={closeModal}
      className="request-modal-style"
    >
      <br />
      {error === 'OWNER_PROFILE_NOT_FOUND' && <OwnerProfileError />}
      {error === 'APPOINTMENT_TIME_NOT_FOUND' && (
        <CreateAppointmentTime
          t={t}
          oneDayPrice={11}
          overnightPrice={25}
          modalVisible={modalVisible}
        />
      )}
    </Modal>
  );
}

export default RequestModal;

function OwnerProfileError() {
  return (
    <>
      <h6>
        You will not be able to send a request to any cat sitter until you have a cat owner profile.
      </h6>
      <h6>
        Go to the <Link to={`/account/${cookies.get('shortId')}`}>account page</Link>, and click on
        the 'Cat owner profile' tab to create your cat owner profile!
      </h6>
    </>
  );
}
