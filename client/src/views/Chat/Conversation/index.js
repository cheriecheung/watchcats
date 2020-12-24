import React, { useState } from 'react';
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

const NavHeight = 7;
const ConversationTab = 7

function Conversation({
  FormProvider,
  methods,
  conversationInfo,
  allMessages,
  onSubmitMessage,
  chatContainerRef,
  backToList,
  goToInfo
}) {
  const { handleSubmit } = methods

  const { recipient } = conversationInfo || {}
  const { firstName, lastName, profilePicture: recipientPicture } = recipient || {}

  const [messageInputHeight, setMessageInputHeight] = useState(10);
  const [textAreaRows, setTextAreaRows] = useState(1);

  return (
    <ConversationContainer>
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
    </ConversationContainer>
  );
}

export default Conversation;