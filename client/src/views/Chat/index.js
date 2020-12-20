import React from 'react';
import {
  ChatListContainer,
  ChatListLayer,
  ChatListSubLayer,
  ConversationContainer,
  ConversationInfoContainer,
  MainContainer,
} from './components/styledComponents'
import ChatListItem from './containers/ChatListItem';
import Conversation from './containers/Conversation';
import ConversationInfo from './containers/ConversationInfo';
import { useChat } from './viewModel'

const ListWidth = 25;
const ChatDetailsWidth = 25;
const ChatWidth = 100 - ListWidth - ChatDetailsWidth;

function Chat() {
  const {
    t,
    FormProvider,
    methods,
    chatList,
    clickedChat,
    hoveredChat,
    setHoveredChat,
    onFetchConversation,
    conversationInfo,
    allMessages,
    onSubmitMessage,
    chatContainerRef
  } = useChat();

  return (
    <MainContainer>
      <ChatListContainer>
        <ChatListLayer>
          <ChatListSubLayer>
            {chatList && chatList.map(item =>
              <ChatListItem
                key={item.id}
                item={item}
                clickedChat={clickedChat}
                hoveredChat={hoveredChat}
                setHoveredChat={setHoveredChat}
                onFetchConversation={onFetchConversation}
              />
            )}
          </ChatListSubLayer>
        </ChatListLayer>
      </ChatListContainer>

      <ConversationContainer>
        <Conversation
          FormProvider={FormProvider}
          methods={methods}
          conversationInfo={conversationInfo}
          allMessages={allMessages}
          onSubmitMessage={onSubmitMessage}
          chatContainerRef={chatContainerRef}
        />
      </ConversationContainer>

      <ConversationInfoContainer>
        <ConversationInfo info={conversationInfo} />
      </ConversationInfoContainer>
    </MainContainer>
  );
}

export default Chat;
