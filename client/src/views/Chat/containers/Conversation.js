import React, { useState } from 'react';
import { TextArea } from '../../../components/FormComponents';
import {
  ConversationLayer,
  ConversationSubLayer,
  MessageInputContainer,
  SubmitButton
} from '../components/styledComponents'
import AutomatedMessage from './AutomatedMessage'
import MessageBubble from './MessageBubble';

const NavHeight = 7;

function Conversation({
  FormProvider,
  methods,
  conversationInfo,
  allMessages,
  onSubmitMessage,
  chatContainerRef
}) {
  const { handleSubmit } = methods

  const { sender } = conversationInfo

  const [messageInputHeight, setMessageInputHeight] = useState(10);
  const [textAreaRows, setTextAreaRows] = useState(1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitMessage)}>
        <ConversationLayer
          style={{ height: `${100 - NavHeight - messageInputHeight}vh` }}
          ref={chatContainerRef}
        >
          <ConversationSubLayer>
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
          </ConversationSubLayer>
        </ConversationLayer>

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
      </form>
    </FormProvider>
  );
}

export default Conversation;