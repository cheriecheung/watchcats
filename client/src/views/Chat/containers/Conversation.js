import React, { useState } from 'react';
import { TextArea } from '../../../components/FormComponents';
import { Image } from '../../../components/UIComponents'
import {
  ConversationScrollableLayer,
  FormContainer,
  IconButton,
  MessageInputContainer,
  MobileViewTab,
  ScrollableLayer,
  ScrollableSubLayer,
  SubmitButton
} from '../components/styledComponents'
import AutomatedMessage from './AutomatedMessage'
import MessageBubble from './MessageBubble';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const NavHeight = 7;
const ConversationTab = 7
const { REACT_APP_API_DOMAIN } = process.env;

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

  const pictureUrl = recipientPicture ?
    `${REACT_APP_API_DOMAIN}/image/${recipientPicture}` : defaultProfilePic

  const [messageInputHeight, setMessageInputHeight] = useState(10);
  const [textAreaRows, setTextAreaRows] = useState(1);

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={handleSubmit(onSubmitMessage)}>
        <MobileViewTab>
          <div style={{ display: 'flex' }}>
            <IconButton type="button" onClick={backToList}>
              <i className="fas fa-arrow-left" />
            </IconButton>

            <div
              style={{
                margin: '0 10px',
                width: 40,
                height: 40,
                borderRadius: 10,
                alignSelf: 'center',
                overflow: 'hidden',
              }}
            >
              <Image url={pictureUrl} />
            </div>
            <h5 style={{ alignSelf: 'center' }}>{firstName} {lastName && lastName.charAt(0)}</h5>
          </div>

          <IconButton type="button" onClick={goToInfo}>
            <i className="fas fa-info-circle" />
          </IconButton>
        </MobileViewTab>

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
  );
}

export default Conversation;