import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function useAccount() {
  const pageRef = useRef(null);
  const history = useHistory();

  const { t } = useTranslation();

  const { accountTab } = useLocation().state || {};
  const defaultKey = accountTab || 'settings';

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [newAccountTab, setNewAccountTab] = useState('');

  const { generalInfo, sitter, ownerSaved } = useSelector((state) => state.account);

  useEffect(() => {
    if (window.scrollTo) window.scrollTo(0, 0);
    // window.scrollTo(0, pageRef.current.offsetTop);
  }, []);

  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    setActiveKey(defaultKey)
  }, [])

  const tabs = [
    { key: 'settings', tab: t('account.settings') },
    { key: 'general', tab: t('account.general_info') },
    { key: 'sitter', tab: t('account.sitter_profile') },
    { key: 'owner', tab: t('account.owner_profile') }
  ];

  useEffect(() => {
    console.log({ generalInfo, sitter, ownerSaved })
    if (generalInfo) {
      setModalContent('You have successfully saved your general information');
      setNewAccountTab('general');
      setModalVisible(true);
    }

    if (sitter) {
      setModalContent('You have successfully saved your sitter account');
      setNewAccountTab('sitter');
      setModalVisible(true);
    }

    if (ownerSaved) {
      setModalContent('You have successfully saved your owner account');
      setNewAccountTab('owner');
      setModalVisible(true);
    }
  }, [generalInfo, sitter, ownerSaved]);

  function onOk() {
    history.push({ state: { accountTab: newAccountTab } });
    window.location.reload();
  }

  return {
    pageRef,
    activeKey,
    setActiveKey,
    tabs,
    modalVisible,
    modalContent,
    onOk
  }
}

export { useAccount };