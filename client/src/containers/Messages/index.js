import React from 'react';
import styled from 'styled-components';
import List from './List';
import Chat from './Chat';
import ChatDetails from './ChatDetails';
import { NavHeight } from '../../components/Layout/Header';

const ListWidth = 25;
const ChatDetailsWidth = 25;
const ChatWidth = 100 - ListWidth - ChatDetailsWidth;

const InboxContainerHeight = 100 - NavHeight;

const InboxContainer = styled.div`
  text-align: left;
  width: 100vw;
  height: ${InboxContainerHeight}vh;
  display: flex;
`;

const InboxPartContainer = styled.div`
  width: ${(props) => props.width}%;
  background: rgba(255, 255, 255, ${(props) => props.backgroundOpacity});
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover {
    overflow-y: ${(props) => props.hoverOverflowY};
  }
`;

const ListContainer = styled.div`
  width: ${(props) => props.width}%;
  background: rgba(255, 255, 255, ${(props) => props.backgroundOpacity});
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
  overflow: auto;
  visibility: hidden;
  transition: visibility 0.6s;
  &::-webkit-transition {
    visibility 0.6s;
  }
  &:hover {
    visibility: visible;
  }
  &:focus {
    visibility: visible;
  }
`;

const ListContent = styled.div`
  border-right: 1px solid #e8e8e8;
  visibility: visible;
`;

const allChats = [];
for (let i = 0; i < 8; i++) {
  allChats.push({
    id: i,
    name: `Person 00${i}`,
    image: '',
    message: 'Hi id like you to look after my cat',
    isSelected: i === 2,
  });
}

function Messages() {
  return (
    <>
      <InboxContainer className="message-inbox">
        <ListContainer
          width={ListWidth}
          backgroundOpacity={0.8}
          borderRight="1px solid #E8E8E8"
          hoverOverflowY="auto"
        >
          <ListContent>
            <List allChats={allChats} />
          </ListContent>
        </ListContainer>
        <InboxPartContainer width={ChatWidth} backgroundOpacity={0.2} hoverOverflowY="hidden">
          <Chat />
        </InboxPartContainer>
        <InboxPartContainer
          width={ChatDetailsWidth}
          backgroundOpacity={0.8}
          borderLeft="1px solid #E8E8E8"
          hoverOverflowY="auto"
        >
          <ChatDetails />
        </InboxPartContainer>
      </InboxContainer>
    </>
  );
}

export default Messages;
