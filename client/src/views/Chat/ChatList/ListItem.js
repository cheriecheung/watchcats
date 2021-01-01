import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import { ChatListItemContainer, ContactName, DateDisplay, TextContainer } from '../styledComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { formatDate } from '../../../utility';

const { REACT_APP_API_DOMAIN } = process.env;

function ChatListItem({
  item,
  clickedChat,
  hoveredChat,
  setHoveredChat,
  onFetchConversation
}) {
  const {
    id: chatId,
    lastMessage,
    lastMessageDate,
    recipient
  } = item || {};

  const {
    firstName,
    lastName,
    profilePicture,
    shortId
  } = recipient || {}

  const pictureUrl = profilePicture ?
    `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  return (
    <ChatListItemContainer
      // isClicked={clickedChat === chatId} 
      onClick={() => onFetchConversation(shortId, chatId)}
      onMouseOver={() => setHoveredChat(chatId)}
      onMouseLeave={() => setHoveredChat('')}
      style={{ background: clickedChat === chatId || hoveredChat === chatId ? '#f3f3f3' : '#fff' }}
    >
      <ImageContainer
        variant="bookings"
        style={{ width: 60, height: 60, marginLeft: -20 }}
      >
        <Image url={pictureUrl} />
      </ImageContainer>

      <TextContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ContactName>
            {firstName} {lastName && lastName.charAt(0)}
          </ContactName>
          <DateDisplay>
            {formatDate(lastMessageDate, 'DD/MM/YY')}
          </DateDisplay>
        </div>
        <span>{lastMessage}</span>
      </TextContainer>
    </ChatListItemContainer>
  );
}

export default ChatListItem;