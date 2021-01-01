import React from 'react';

function AutomatedMessage({ message, conversationInfo }) {

  console.log({ message, conversationInfo })
  const { sender: currentUser } = conversationInfo || {}
  const { id: currentUserId } = currentUser

  const { booking, sender: bookingResponder } = message || {}
  const { sitter } = booking || {}
  const person = currentUserId === bookingResponder ? 'you' : sitter

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
          {/* {date}, {time} */}
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
          A BOOKING REQUEST HAS BEEN MADE BY {person}.
        </span>
      </div>
    </>
  );
}

export default AutomatedMessage