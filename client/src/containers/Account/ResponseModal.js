import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ResponseModal() {
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const { generalInfo } = useSelector((state) => state.account);

  useEffect(() => {
    if (generalInfo) {
      setModalContent('You have successfully saved your general information');
      setModalVisible(true);
    }
  }, [generalInfo]);

  return (
    <Modal
      visible={modalVisible}
      onOk={() => {
        history.push({ state: { accountTab: 'general' } });
        window.location.reload();
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      closable={false}
      maskClosable={false}
    >
      <br />
      {modalContent}
    </Modal>
  );
}

export default ResponseModal;
