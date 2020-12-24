import React from 'react';
import {
  ChatListContainer,
  ChatListScrollableLayer,
  ScrollableSubLayer
} from '../styledComponents'
import ListItem from './ListItem';

function ChatList({
  allChats,
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
              key={item.id}
              item={item}
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