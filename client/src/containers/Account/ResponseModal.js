import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ResponseModal() {
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [accountTab, setAccountTab] = useState('');

  const { generalInfo, sitter, ownerSaved } = useSelector((state) => state.account);

  useEffect(() => {
    console.log({ generalInfo, sitter, ownerSaved })
    if (generalInfo) {
      setModalContent('You have successfully saved your general information');
      setAccountTab('general');
      setModalVisible(true);
    }

    if (sitter) {
      setModalContent('You have successfully saved your sitter account');
      setAccountTab('sitter');
      setModalVisible(true);
    }

    if (ownerSaved) {
      setModalContent('You have successfully saved your owner account');
      setAccountTab('owner');
      setModalVisible(true);
    }
  }, [generalInfo, sitter, ownerSaved]);

  return (
    <Modal
      visible={modalVisible}
      onOk={() => {
        history.push({ state: { accountTab } });
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
