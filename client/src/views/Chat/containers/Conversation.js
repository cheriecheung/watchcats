import React, { useState } from 'react';
import { TextArea } from '../../../components/FormComponents';
import { ChatContainer, ChatContent, MessageInputContainer } from '../components/styledComponents'
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
      <form className="m-0" onSubmit={handleSubmit(onSubmitMessage)}>
        <ChatContainer
          style={{ height: `${100 - NavHeight - messageInputHeight}vh` }}
          ref={chatContainerRef}
        >
          <ChatContent>
            <AutomatedMessage
              content="Your conversation with Anna C begins"
              date="2020-08-02"
              time="14:07"
            />
            {allMessages &&
              allMessages.map(message => <MessageBubble message={message} sender={sender} />)
            }
            {/* <Messages allMessages={allMessages} sender={sender} /> */}
            <AutomatedMessage
              content="Reminder - leave a review"
              date="2020-08-23"
              time="20:23"
            />
          </ChatContent>
        </ChatContainer>
        <MessageInputContainer style={{ height: `${messageInputHeight}vh` }}>
          <TextArea
            name="messageInput"
            placeholder="Type a message..."
            rows={textAreaRows}
            customStyle={{ margin: '0 5px', overflowY: 'auto' }}
          />
          <button
            style={{
              // background: '#ffa195',
              background: 'none',
              color: '#ffa195',
              border: 'none',
              outline: 'none',
              padding: '0 10px',
              //borderRadius: 10,
              //border: '1px solid #d9d9d9',
            }}
            type="submit"
          >
            <i className="fas fa-paper-plane fa-lg" />
          </button>
        </MessageInputContainer>
      </form>
    </FormProvider>
  );
}

export default Conversation;