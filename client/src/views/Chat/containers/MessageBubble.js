import React from 'react';

function MessageBubble({ message, sender }) {
  const {
    id,
    userId,
    name,
    image,
    date,
    time,
    content,
    sender: messageSender
  } = message

  const messageFlexDirection =
    sender === messageSender ? 'row-reverse' : 'row';

  const messageBorderRadius =
    sender === messageSender ?
      { borderBottomRightRadius: 0 } :
      { borderBottomLeftRadius: 0 };

  const messageBackgroundColor =
    sender === messageSender ? 'rgba(219, 254, 224, 0.8)' : '#fff';

  const imageBubbleDisplay =
    sender === messageSender ? 'none' : 'block';

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
}

export default MessageBubble