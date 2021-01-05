import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import {
  ChatListItemContainer,
  ContactName,
  DateDisplay,
  TextContainer
} from '../styledComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { formatDate } from '../../../utility';
import AUTOMATED_MESSAGES from '../../../constants/automatedMessages'

const { REACT_APP_API_DOMAIN } = process.env;

function ChatListItem({
  item,
  clickedChat,
  hoveredChat,
  setHoveredChat,
  onFetchConversation
}) {
  const {
    _id: chatId,
    lastMessage,
    // lastMessageDate,
    participant1,
    participant2,
    // recipient,
    updatedAt: lastMessageDate
  } = item || {};
  const { content } = lastMessage || {}

  const recipient = participant1 ? participant1 : participant2;

  const {
    firstName,
    lastName,
    profilePicture,
    urlId
  } = recipient || {}

  const pictureUrl = profilePicture ?
    `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  const renderLastMessage = (type) => {
    switch (type) {
      case AUTOMATED_MESSAGES.BOOKING_REQUESTED:
        return `A booking request has been made`
      case AUTOMATED_MESSAGES.BOOKING_CONFIRMED:
        return `A booking has been accepted`
      case AUTOMATED_MESSAGES.BOOKING_DECLINED:
        return `A booking has been declined`
      case AUTOMATED_MESSAGES.BOOKING_DECLINEDBOOKING_COMPLETED:
        return `A booking has been marked as completed`
      default:
        return content;
    }
  }

  return (
    <ChatListItemContainer
      onClick={() => onFetchConversation(urlId, chatId)}
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
        <span>{renderLastMessage(content)}</span>
      </TextContainer>
    </ChatListItemContainer>
  );
}

export default ChatListItem;