import React from 'react';
import { formatDate, formatTime } from '../../../utility';
import { Image } from '../../../components/UIComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg';

const { REACT_APP_API_DOMAIN } = process.env;

function MessageBubble({ message, conversationInfo }) {
  const {
    id,
    content,
    createdAt,
    sender: messageSender
  } = message || {}
  console.log({ message })

  const { sender, recipient } = conversationInfo || {}
  const { _id: senderId, profilePicture: senderPicture } = sender || {}
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

  const messageTimeAlignSelf = senderId === messageSender ? 'flex-end' : 'unset';

  return (
    <div key={id}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
          {formatDate(createdAt, 'DD MMM')}
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
          margin: '10px 0',
          display: 'flex',
          flexDirection: messageFlexDirection,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            alignSelf: 'center',
            overflow: 'hidden',
            display: senderId === messageSender ? 'none' : 'block'
          }}
        >
          <Image url={pictureUrl} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 10px'
        }}>
          <div
            style={{
              marginBottom: 5,
              padding: '8px 15px',
              // maxWidth: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
              backgroundColor: messageBackgroundColor,
              borderRadius: 10,
              ...messageBorderRadius,
            }}
          >
            {content}
          </div>
          <span style={{ opacity: 0.6, fontSize: '0.8rem', alignSelf: messageTimeAlignSelf }}>
            {formatTime(createdAt, 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble