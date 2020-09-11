import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function RequestModal({ modalVisible, closeModal, error, appointmentTime, handleSendRequest }) {
  useEffect(() => {
    console.log({ error });
  }, [error]);
  return (
    <Modal
      //  title=""
      visible={modalVisible}
      onOk={handleSendRequest}
      onCancel={closeModal}
    >
      <br />
      {error === 'OWNER_PROFILE_NOT_FOUND' && <OwnerProfileError />}
      {error === 'APPOINTMENT_TIME_NOT_FOUND' && <AppointmentTimeError />}
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

function AppointmentTimeError() {
  return <h6>rhrher</h6>;
}
