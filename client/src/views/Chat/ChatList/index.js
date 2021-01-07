import React from 'react';
import {
  ChatListContainer,
  ChatListScrollableLayer,
  ScrollableSubLayer
} from '../styledComponents'
import ListItem from './ListItem';

function ChatList({
  allChats,
  unreadChats,
  clickedChat,
  hoveredChat,
  setHoveredChat,
  onFetchConversation
}) {
  return (
    <ChatListContainer>
      <ChatListScrollableLayer>
        <ScrollableSubLayer>
          {allChats && allChats.map(item =>
            <ListItem
              key={item._id}
              item={item}
              unreadChats={unreadChats}
              clickedChat={clickedChat}
              hoveredChat={hoveredChat}
              setHoveredChat={setHoveredChat}
              onFetchConversation={onFetchConversation}
            />
          )}
        </ScrollableSubLayer>
      </ChatListScrollableLayer>
    </ChatListContainer>
  )
}

export default ChatList