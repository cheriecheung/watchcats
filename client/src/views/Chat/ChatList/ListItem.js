import React from 'react';
import { Badge, Image, ImageContainer } from '../../../components/UIComponents'
import {
  ChatListItemContainer,
  ContactName,
  DateDisplay,
  TextContainer
} from '../styledComponents'
import { formatDate } from '../../../utility';
import AUTOMATED_MESSAGES from '../../../constants/automatedMessages'

function ChatListItem({
  item,
  unreadChats,
  clickedChat,
  hoveredChat,
  setHoveredChat,
  onFetchConversation
}) {
  const {
    _id: chatId,
    lastMessage,
    participant1,
    participant2,
    updatedAt: lastMessageDate
  } = item || {};

  const { content } = lastMessage || {}
  const recipient = participant1 ? participant1 : participant2;
  const isUnread = unreadChats && unreadChats.includes(chatId)

  const {
    firstName,
    lastName,
    profilePicture,
    urlId
  } = recipient || {}

  const renderLastMessage = (type) => {
    switch (type) {
      case AUTOMATED_MESSAGES.BOOKING_REQUESTED:
        return `A booking request has been made`
      case AUTOMATED_MESSAGES.BOOKING_CONFIRMED:
        return `A booking has been accepted`
      case AUTOMATED_MESSAGES.BOOKING_DECLINED:
        return `A booking has been declined`
      case AUTOMATED_MESSAGES.BOOKING_COMPLETED:
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
        <Image url={profilePicture} />
      </ImageContainer>

      <TextContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ContactName>
            {firstName} {lastName && lastName.charAt(0)}
          </ContactName>
          <DateDisplay>
            {formatDate(lastMessageDate, 'DD MMM')}
          </DateDisplay>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{renderLastMessage(content)}</span>
          <Badge isShown={isUnread} style={{ paddingTop: 5 }} />
        </div>
      </TextContainer>
    </ChatListItemContainer>
  );
}

export default ChatListItem;