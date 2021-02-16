import React from 'react';
import styled from 'styled-components'
import {
  ConversationContainer,
  ConversationScrollableLayer,
  FormContainer,
  ScrollableSubLayer,
} from '../styledComponents'
import AutomatedMessage from './AutomatedMessage'
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput'
import MobileViewTab from './MobileViewTab'

const ChatContainer = styled.div`
  position: relative;
  height: 93vh;

  width: 50vw;
  overflow: hidden;

  @media (max-width: 920px) {
    width: 65vw;
    height: 86vh;
    overflow: visible;
  }

  @media (max-width: 735px) {
    width: 100vw;
  }
`;

const Chat = styled.div`
  position: absolute;
  top: 0;
  bottom: ${({ bottom }) => bottom};
  padding: 10px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;


function Conversation({
  t,
  conversationInfo,
  allMessages,
  onSubmitMessage,
  chatContainerRef,
  backToList,
  goToInfo,
  inputRef,
  inputHeight,
  scrollHeight,
  onChangeHeight,
  message,
  setMessage
}) {
  const { recipient } = conversationInfo || {}
  const { firstName, lastName, profilePicture: recipientPicture } = recipient || {}

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MobileViewTab
        recipientPicture={recipientPicture}
        backToList={backToList}
        goToInfo={goToInfo}
        firstName={firstName}
        lastName={lastName}
      />

      <ChatContainer>
        <FormContainer onSubmit={onSubmitMessage}>
          <ConversationScrollableLayer
            bottom={inputHeight}
            ref={chatContainerRef}
          >
            <ScrollableSubLayer>
              {allMessages &&
                allMessages.map(message => {
                  const { content, id } = message;

                  return (
                    content.includes('AUTOMATED_MESSAGE') ?
                      <AutomatedMessage
                        key={id}
                        t={t}
                        message={message}
                        conversationInfo={conversationInfo}
                      />
                      :
                      <MessageBubble
                        key={id}
                        message={message}
                        conversationInfo={conversationInfo}
                      />
                  )
                })
              }
            </ScrollableSubLayer>
          </ConversationScrollableLayer>

          <MessageInput
            inputRef={inputRef}
            onChangeHeight={onChangeHeight}
            scrollHeight={scrollHeight}
            message={message}
            setMessage={setMessage}
          />
        </FormContainer>
      </ChatContainer>
    </div>
  );
}

export default Conversation;