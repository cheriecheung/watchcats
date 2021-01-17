import React, { useState } from 'react';
import { AutoSizeInput, SubmitButton } from '../styledComponents'

function MessageInput({
  inputRef,
  onChangeHeight,
  scrollHeight,
  message,
  setMessage
}) {

  return (
    <div>
      <AutoSizeInput
        name="messageInput"
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={onChangeHeight}
        scrollHeight={scrollHeight}
      />
      <SubmitButton type="submit"
        style={{
          position: 'absolute',
          bottom: 15,
          right: 10,
        }}
      >
        <i className="fas fa-paper-plane fa-lg" />
      </SubmitButton>
    </div>
  )
}

export default MessageInput