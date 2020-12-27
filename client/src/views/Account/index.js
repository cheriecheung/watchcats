import React from 'react';
import styled from 'styled-components';
import { Modal, TabBar, TabItem } from '../../components/UIComponents'

import Settings from './Settings';
import Personal from './Personal';
import CatSitterInfo from './CatSitterInfo';
import CatOwnerInfo from './CatOwnerInfo';

import { useAccount } from './viewModel'

const Container = styled.div`
  margin: 0 4vw; 
  padding: 40px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto; 

  @media (max-width: 680px) {
    width: 90vw;
  }
`

function Account() {
  const {
    pageRef,
    activeKey,
    setActiveKey,
    tabs,
    modalVisible,
    modalContent,
    onOk
  } = useAccount();

  const renderTabContent = () => {
    switch (activeKey) {
      case 'personal':
        return <Personal />
      case 'sitter':
        return <CatSitterInfo />
      case 'owner':
        return <CatOwnerInfo />
      default:
        return <Settings />
    }
  }

  return (
    <Container style={{ color: ' #7f7f7f' }}>
      <TabBar>
        {tabs.map(({ key, tab }) =>
          <TabItem
            key={key}
            isSelected={activeKey === key}
            onClick={() => setActiveKey(key)}
          >
            {tab}
          </TabItem>
        )}
      </TabBar>

      <Content>
        {renderTabContent()}
      </Content>

      <Modal
        visible={modalVisible}
        onOk={onOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        maskClosable={false}
      >
        <br />
        {modalContent}
      </Modal>
    </Container>
  );
}

export default Account;