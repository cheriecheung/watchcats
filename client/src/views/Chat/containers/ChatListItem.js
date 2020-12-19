import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import { ListItemContainer, TextContainer } from '../components/styledComponents'
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
    <ListItemContainer
      // isClicked={clickedChat === chatId} 
      onClick={() => onFetchConversation(shortId, chatId)}
      onMouseOver={() => setHoveredChat(chatId)}
      onMouseLeave={() => setHoveredChat('')}
      style={{ background: clickedChat === chatId || hoveredChat === chatId ? '#f3f3f3' : '#fff' }}
    >
      <ImageContainer
        variant="bookings"
        style={{ width: 60, height: 60 }}
      >
        <Image url={pictureUrl} />
      </ImageContainer>

      <TextContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>{firstName} {lastName && lastName.charAt(0)}</h5>
          <span>{formatDate(lastMessageDate, 'DD/MM/YY')}</span>
        </div>
        <span>{lastMessage}</span>
      </TextContainer>
    </ListItemContainer>
  );
}

export default ChatListItem;