import React from 'react';
import { Image } from '../../../components/UIComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function MessageBubble({ message, conversationInfo }) {
  const {
    id,
    userId,
    name,
    image,
    date,
    time,
    content,
    sender: messageSender
  } = message || {}

  const { sender, recipient } = conversationInfo || {}
  const { id: senderId, profilePicture: senderPicture } = sender || {}
  const { profilePicture: recipientPicture } = recipient || {}

  const pictureType =
    senderId === messageSender ? senderPicture : recipientPicture;

  const pictureUrl = senderPicture && recipientPicture ?
    `${REACT_APP_API_DOMAIN}/image/${pictureType}` : defaultProfilePic

  const messageFlexDirection =
    senderId === messageSender ? 'row-reverse' : 'row';

  const messageBorderRadius =
    senderId === messageSender ?
      { borderBottomRightRadius: 0 } :
      { borderBottomLeftRadius: 0 };

  const messageBackgroundColor =
    senderId === messageSender ? 'rgba(219, 254, 224, 0.8)' : '#fff';

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
            width: 30,
            height: 30,
            borderRadius: '50%',
            alignSelf: 'flex-end',
            overflow: 'hidden',
          }}
        >
          <Image url={pictureUrl} />
        </div>

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