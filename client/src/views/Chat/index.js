import React from 'react';
import {
  ChatListContainer,
  ConversationContainer,
  ConversationInfoContainer,
  MainContainer,
  ScrollableLayer,
  ScrollableSubLayer
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
    chatContainerRef,
    mobileScreenView,
    backToList,
    backToConversation,
    goToInfo
  } = useChat();

  return (
    <MainContainer>
      <ChatListContainer
        //isShown={mobileScreenView === 'list'}
        mobileScreenView={mobileScreenView}
      >
        <ScrollableLayer>
          <ScrollableSubLayer>
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
          </ScrollableSubLayer>
        </ScrollableLayer>
      </ChatListContainer>

      <ConversationContainer mobileScreenView={mobileScreenView}>
        <Conversation
          FormProvider={FormProvider}
          methods={methods}
          conversationInfo={conversationInfo}
          allMessages={allMessages}
          onSubmitMessage={onSubmitMessage}
          chatContainerRef={chatContainerRef}
          backToList={backToList}
          goToInfo={goToInfo}
        />
      </ConversationContainer>

      <ConversationInfoContainer
        isShown={mobileScreenView === 'info'}
        mobileScreenView={mobileScreenView}
      >
        <ScrollableLayer>
          <ScrollableSubLayer>
            <ConversationInfo
              info={conversationInfo}
              backToConversation={backToConversation}
            />
          </ScrollableSubLayer>
        </ScrollableLayer>
      </ConversationInfoContainer>
    </MainContainer>
  );
}

export default Chat;
