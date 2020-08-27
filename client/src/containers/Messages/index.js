import React from 'react';
import styled from 'styled-components';
import List from './List';
import Chat from './Chat';
import { NavHeight } from '../../components/Layout/Header';

const ListContainerWidth = 25;
const ChatContainerWidth = 100 - ListContainerWidth;

const InboxContainerHeight = 100 - NavHeight;

const InboxContainer = styled.div`
  text-align: left;
  width: 100vw;
  height: ${InboxContainerHeight}vh;
  border-radius: 10px;
  // box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  display: flex;
`;

const ListContainer = styled.div`
  width: ${ListContainerWidth}%;
  background: rgba(255, 255, 255, 0.8);
  overflow-x: hidden;
  overflow-y: visible;
`;

const ChatContainer = styled.div`
  width: ${ChatContainerWidth}%;
  background: rgba(255, 255, 255, 0.2);
`;

function Messages() {
  return (
    <>
      <InboxContainer>
        <ListContainer>
          <List />
        </ListContainer>
        <ChatContainer>
          <Chat />
        </ChatContainer>
      </InboxContainer>
    </>
  );
}

export default Messages;
