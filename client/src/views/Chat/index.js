import React from 'react';
import styled from 'styled-components';
import Conversation from './containers/Conversation';
import ConversationInfo from './containers/ConversationInfo';
import List from './containers/List';
import { useChat } from './viewModel'

const NavHeight = 7;

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

function Chat() {
  const {
    t,
    FormProvider,
    methods,
    chatList,
    conversationInfo,
    allMessages,
    onSubmitMessage,
    chatContainerRef
  } = useChat();

  return (
    <InboxContainer className="message-inbox">
      <ListContainer
        width={ListWidth}
        backgroundOpacity={0.8}
        borderRight="1px solid #E8E8E8"
        hoverOverflowY="auto"
      >
        <ListContent>
          <List chatList={chatList} />
        </ListContent>
      </ListContainer>
      <InboxPartContainer width={ChatWidth} backgroundOpacity={0.2} hoverOverflowY="hidden">
        <Conversation
          FormProvider={FormProvider}
          methods={methods}
          conversationInfo={conversationInfo}
          allMessages={allMessages}
          onSubmitMessage={onSubmitMessage}
          chatContainerRef={chatContainerRef}
        />
      </InboxPartContainer>
      <InboxPartContainer
        width={ChatDetailsWidth}
        backgroundOpacity={0.8}
        borderLeft="1px solid #E8E8E8"
        hoverOverflowY="auto"
      >
        <ConversationInfo info={conversationInfo} />
      </InboxPartContainer>
    </InboxContainer>
  );
}

export default Chat;
