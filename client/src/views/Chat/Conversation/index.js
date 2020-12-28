import React, { useState, useRef } from 'react';
import { TextArea } from '../../../components/FormComponents';
import {
  ConversationContainer,
  ConversationScrollableLayer,
  FormContainer,
  MessageInputContainer,
  ScrollableSubLayer,
  SubmitButton
} from '../styledComponents'
import AutomatedMessage from './AutomatedMessage'
import MessageBubble from './MessageBubble';
import MobileViewTab from './MobileViewTab'

import styled from 'styled-components'

const NavHeight = 7;
const ConversationTab = 7

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

const AutoSizeInput = styled.textarea`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px;
  width: 100%;
  height: 2rem;
  font-size: 1.4rem;
  overflow-x: hidden;
  overflow-y: ${({ scrollHeight }) =>
    scrollHeight >= 150 ? "scroll" : "hidden"};
  resize: none;
  outline: none;
`;

function Conversation({
  FormProvider,
  methods,
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
}) {
  const { handleSubmit } = methods

  const { recipient } = conversationInfo || {}
  const { firstName, lastName, profilePicture: recipientPicture } = recipient || {}

  const [message, setMessage] = useState("");

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
        <FormProvider {...methods}>
          <FormContainer onSubmit={handleSubmit(onSubmitMessage)}>
            <ConversationScrollableLayer
              bottom={inputHeight}
              ref={chatContainerRef}
            >
              <ScrollableSubLayer>
                {allMessages &&
                  allMessages.map(message =>
                    <MessageBubble message={message} conversationInfo={conversationInfo} />
                  )
                }
              </ScrollableSubLayer>
            </ConversationScrollableLayer>

            <AutoSizeInput
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={onChangeHeight}
              scrollHeight={scrollHeight}
            />

            {/* <ConversationContainer>
      <FormProvider {...methods}>
        <FormContainer onSubmit={handleSubmit(onSubmitMessage)}>
          <MobileViewTab
            recipientPicture={recipientPicture}
            backToList={backToList}
            goToInfo={goToInfo}
            firstName={firstName}
            lastName={lastName}
          />

          <ConversationScrollableLayer
            // style={{
            //   height: `${100 - NavHeight - messageInputHeight}vh`,
            //   marginLeft: 10
            // }}
            ref={chatContainerRef}
          >
            <ScrollableSubLayer>
              <AutomatedMessage
                content="Your conversation with Anna C begins"
                date="2020-08-02"
                time="14:07"
              />
              {allMessages &&
                allMessages.map(message =>
                  <MessageBubble message={message} conversationInfo={conversationInfo} />
                )
              }
              <AutomatedMessage
                content="Reminder - leave a review"
                date="2020-08-23"
                time="20:23"
              />
            </ScrollableSubLayer>
          </ConversationScrollableLayer>

          <MessageInputContainer style={{ height: `${messageInputHeight}vh` }}>
            <TextArea
              name="messageInput"
              placeholder="Type a message..."
              rows={textAreaRows}
              customStyle={{ margin: '0 5px', overflowY: 'auto' }}
            />
            <SubmitButton type="submit">
              <i className="fas fa-paper-plane fa-lg" />
            </SubmitButton>
          </MessageInputContainer>
        </FormContainer>
      </FormProvider>
    </ConversationContainer> */}
          </FormContainer>
        </FormProvider>
      </ChatContainer>
    </div>
  );
}

export default Conversation;