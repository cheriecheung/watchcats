import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import CreateAppointmentTime from './CreateAppointmentTime';
import CreateOwnerProfile from './CreateOwnerProfile';
import SelectAppointmentTime from './SelectAppointmentTime';

function RequestModal({
  modalVisible,
  closeModal,
  error,
  appointmentTime,
  oneDayPrice,
  overnightPrice,
  handleSendRequest,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.log({ appointmentTime });
  }, [appointmentTime]);

  const modalOkText = error === 'OWNER_PROFILE_NOT_FOUND' ? 'Ok' : t('sitter_profile.send_request');
  const modalCancelButton =
    error === 'OWNER_PROFILE_NOT_FOUND'
      ? { style: { visibility: 'hidden' } }
      : { style: { visibility: 'visible' } };

  return (
    <Modal
      //  title=""
      visible={modalVisible}
      onOk={handleSendRequest}
      okText={modalOkText}
      onCancel={closeModal}
      cancelButtonProps={modalCancelButton}
      className="request-modal-style"
    >
      <br />

      {appointmentTime && (
        <SelectAppointmentTime
          t={t}
          appointmentTime={appointmentTime}
          oneDayPrice={oneDayPrice}
          overnightPrice={overnightPrice}
        />
      )}

      {error === 'APPOINTMENT_TIME_NOT_FOUND' && (
        <CreateAppointmentTime
          t={t}
          oneDayPrice={oneDayPrice}
          overnightPrice={overnightPrice}
          modalVisible={modalVisible}
        />
      )}

      {error === 'OWNER_PROFILE_NOT_FOUND' && <CreateOwnerProfile t={t} />}
    </Modal>
  );
}

export default RequestModal;
