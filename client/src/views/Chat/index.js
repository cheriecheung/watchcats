import React from 'react';
import { MainContainer } from './styledComponents'
import ChatList from './ChatList';
import Conversation from './Conversation';
import ConversationInfo from './ConversationInfo';
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
    <MainContainer mobileScreenView={mobileScreenView}>
      <ChatList
        allChats={chatList}
        clickedChat={clickedChat}
        hoveredChat={hoveredChat}
        setHoveredChat={setHoveredChat}
        onFetchConversation={onFetchConversation}
      />

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

      <ConversationInfo
        info={conversationInfo}
        backToConversation={backToConversation}
        mobileScreenView={mobileScreenView}
      />
    </MainContainer>
  );
}

export default Chat;
