import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { TextArea } from '../../components/FormComponents';
import { NavHeight } from '../../components/Layout/Header';

const ChatContainer = styled.div``;

const MessageInputContainer = styled.div`
  background-color: #fff;
  padding: 13px 20px;
  display: flex;
`;

function Chat() {
  const methods = useForm();
  const { register, handleSubmit, watch, reset } = methods;

  const [messageInputHeight, setMessageInputHeight] = useState(10);
  const [textAreaRows, setTextAreaRows] = useState(1);

  const handleSendMessage = (e) => {
    e.preventDefault();
  };

  return (
    <FormProvider {...methods}>
      <form>
        <ChatContainer
          style={{ height: `${100 - NavHeight - messageInputHeight}vh` }}
        ></ChatContainer>
        <MessageInputContainer style={{ height: `${messageInputHeight}vh` }}>
          <TextArea
            name="message"
            rows={textAreaRows}
            customStyle={{ margin: '0 15px', overflowY: 'auto' }}
          />
          <button
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: '0 20px',
              borderRadius: 10,
              border: '1px solid #d9d9d9',
            }}
            onClick={handleSendMessage}
          >
            <i class="fas fa-paper-plane" />
          </button>
        </MessageInputContainer>
      </form>
    </FormProvider>
  );
}

export default Chat;
