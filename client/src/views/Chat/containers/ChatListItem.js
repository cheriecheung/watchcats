import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import { ListItemContainer, TextContainer } from '../components/styledComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function ChatListItem({ item, clickedChat }) {
  const {
    id: chatId,
    lastMessage,
    lastMessageDate,
    recipient
  } = item || {};

  const {
    firstName,
    lastName,
    profilePicture
  } = recipient || {}

  const pictureUrl = profilePicture ?
    `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  console.log({ clickedChat, chatId, isClicked: clickedChat === chatId })

  return (
    <ListItemContainer
      // isClicked={clickedChat === chatId} 
      style={{ background: clickedChat === chatId ? '#f3f3f3' : '#fff' }}
    >
      <ImageContainer
        variant="bookings"
        style={{ width: 80, height: 80 }}
      >
        <Image url={pictureUrl} />
      </ImageContainer>

      <TextContainer>
        <h6>{firstName} {lastName && lastName.charAt(0)}</h6>
        <span>{lastMessage}</span>
      </TextContainer>
    </ListItemContainer>
  );
}

export default ChatListItem;