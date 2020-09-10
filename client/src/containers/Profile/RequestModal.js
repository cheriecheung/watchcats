import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

function RequestModal({ modalVisible, closeModal, appointmentTime, handleSendRequest }) {
  return (
    <Modal
      //  title=""
      visible={modalVisible}
      onOk={handleSendRequest}
      onCancel={closeModal}
    >
      <br />
      hello
    </Modal>
  );
}

export default RequestModal;
