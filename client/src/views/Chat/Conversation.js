import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { TextArea } from '../../components/FormComponents';

const NavHeight = 7;

const ChatContainer = styled.div`
  padding: 0 20px;
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

const ChatContent = styled.div`
  visibility: visible;
`;

const MessageInputContainer = styled.div`
  padding: 13px 20px;
  display: flex;
`;

const defaultValues = {
  messageInput: '',
};

function Chat({
  conversationInfo,
  allMessages,
  onSubmitMessage,
  chatContainerRef
}) {

  const { sender } = conversationInfo
  // const chatContainerRef = useRef(null);
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, watch, reset } = methods;

  const [messageInputHeight, setMessageInputHeight] = useState(10);
  const [textAreaRows, setTextAreaRows] = useState(1);

  // const scrollToBottom = () => {
  //   const scroll = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;

  //   chatContainerRef.current.scrollTo(0, scroll);
  // };

  // retrieve data
  // useEffect(() => {
  //   socket = io(process.env.REACT_APP_API_DOMAIN, { query: { userId: cookies.get('userId') } });
  // }, []);

  return (
    <FormProvider {...methods}>
      <form className="m-0" onSubmit={handleSubmit(onSubmitMessage)}>
        <ChatContainer
          style={{ height: `${100 - NavHeight - messageInputHeight}vh` }}
          ref={chatContainerRef}
        >
          <ChatContent>
            <Messages allMessages={allMessages} sender={sender} />
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

export default Chat;

function Messages({ allMessages, sender }) {
  return (
    <>
      <AutomatedMessage
        content="Your conversation with Anna C begins"
        date="2020-08-02"
        time="14:07"
      />
      {allMessages && allMessages.map((item, index) => {
        const {
          id,
          userId,
          name,
          image,
          date,
          time,
          content,
          sender: messageSender
        } = item

        const messageFlexDirection = sender === messageSender ? 'row-reverse' : 'row';
        const messageBorderRadius =
          sender === messageSender ? { borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 0 };
        const messageBackgroundColor = sender === messageSender ? 'rgba(219, 254, 224, 0.8)' : '#fff';
        const imageBubbleDisplay = sender === messageSender ? 'none' : 'block';

        return (
          <div key={id}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
                {date}, {time}
              </span>
              {/* <span
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.17)',
                  color: '#fff',
                  padding: '1px 8px',
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                {date}
              </span> */}
            </div>
            <div
              style={{
                margin: '15px 0',
                display: 'flex',
                flexDirection: messageFlexDirection,
              }}
            >
              <div
                style={{
                  width: 25,
                  height: 25,
                  background: 'pink',
                  borderRadius: '50%',
                  alignSelf: 'flex-end',
                  display: imageBubbleDisplay,
                }}
              />

              <div
                style={{
                  margin: '0 10px',
                  padding: '8px 15px',
                  maxWidth: '50%',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: messageBackgroundColor,
                  borderRadius: 10,
                  ...messageBorderRadius,
                }}
              >
                <div>{content}</div>
                {/* <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontSize: '0.7rem',
                    marginBottom: -5,
                    marginRight: -5,
                    opacity: 0.6,
                  }}
                >
                  {time}
                </div> */}
              </div>
            </div>
          </div>
        );
      })}

      <AutomatedMessage content="Reminder - leave a review" date="2020-08-23" time="20:23" />
    </>
  );
}

function AutomatedMessage({ content, date, time }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
          {date}, {time}
        </span>
      </div>
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <span
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: '#fff',
            padding: '1px 8px',
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {content}
        </span>
      </div>
    </>
  );
}
