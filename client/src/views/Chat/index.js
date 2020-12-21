import React from 'react';
import {
  ChatListContainer,
  ChatListScrollableLayer,
  ConversationContainer,
  ConversationInfoContainer,
  ConversationInfoLayer,
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

  console.log({ mobileScreenView })

  return (
    <MainContainer mobileScreenView={mobileScreenView}>
      <ChatListContainer>
        {/* <ScrollableLayer> */}
        <ChatListScrollableLayer>
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
        </ChatListScrollableLayer>
        {/* </ScrollableLayer> */}
      </ChatListContainer>

      <ConversationContainer>
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

      <ConversationInfoContainer isTranslateX={mobileScreenView === 'info'}>
        {/* <ScrollableLayer> */}
        <ConversationInfoLayer>
          <ScrollableSubLayer>
            <ConversationInfo
              info={conversationInfo}
              backToConversation={backToConversation}
            />
          </ScrollableSubLayer>
        </ConversationInfoLayer>
        {/* </ScrollableLayer> */}
      </ConversationInfoContainer>
    </MainContainer>
  );
}

export default Chat;
