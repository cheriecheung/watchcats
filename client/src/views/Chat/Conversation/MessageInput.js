import React, { useState } from 'react';
import {
  AutoSizeInput,
  SubmitButton
} from '../styledComponents'

function MessageInput({
  inputRef,
  onChangeHeight,
  scrollHeight
}) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <AutoSizeInput
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={onChangeHeight}
        scrollHeight={scrollHeight}
      />
      <SubmitButton type="submit"
        style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
        }}
      >
        <i className="fas fa-paper-plane fa-lg" />
      </SubmitButton>
    </div>
  )
}

export default MessageInput