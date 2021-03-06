import React from 'react';
import { Modal, ModalSuccessDisplay, Spinner } from '../../../../components/UIComponents'
import CreateAppointmentTime from './CreateAppointmentTime';
import CreateOwnerProfile from './CreateOwnerProfile';
import SelectAppointmentTime from './SelectAppointmentTime';

function RequestBookingModal({
  t,
  modalVisible,
  closeModal,
  profileActionStatus
}) {
  const renderModalContent = () => {
    switch (profileActionStatus) {
      case 'APPOINTMENT_TIME_NOT_FOUND':
        return (
          <CreateAppointmentTime
            t={t}
            closeModal={closeModal}
            modalVisible={modalVisible}
          />
        )
      case 'OWNER_PROFILE_NOT_FOUND':
        return <CreateOwnerProfile t={t} />
      case 'BOOKING_REQUEST_SENT':
        return (
          <ModalSuccessDisplay
            message={t('success.booking_request')}
            onClick={closeModal}
          />
        )
      case 'APPOINTMENT_TIME_RETURNED':
        return (
          <SelectAppointmentTime
            t={t}
            closeModal={closeModal}
          />
        )
      default:
        return <Spinner />
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
