import React from 'react';
import { Modal } from '../../../../components/UIComponents'
import CreateAppointmentTime from './CreateAppointmentTime';
import CreateOwnerProfile from './CreateOwnerProfile';
import SelectAppointmentTime from './SelectAppointmentTime';

function RequestBookingModal({
  t,
  modalVisible,
  closeModal,
  error,
}) {
  const renderModalContent = () => {
    switch (error) {
      case 'APPOINTMENT_TIME_NOT_FOUND':
        return <CreateAppointmentTime t={t} modalVisible={modalVisible} />
      case 'OWNER_PROFILE_NOT_FOUND':
        return <CreateOwnerProfile t={t} />
      default:
        return <SelectAppointmentTime t={t} />
    }
  }

  return (
    <Modal
      visible={modalVisible}
      onCancel={closeModal}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      footer={null}
      maskClosable={false}
      style={{ width: 700 }}
    >
      {renderModalContent()}
    </Modal>
  );
}

export default RequestBookingModal;
