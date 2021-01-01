import React from 'react';
import { LinkButton } from '../../components/UIComponents'
import {
  MainContainer,
  NoChatContainer,
  NoChatTitle,
  NoChatText
} from './styledComponents'
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
    goToInfo,
    inputRef,
    inputHeight,
    scrollHeight,
    onChangeHeight,
  } = useChat();

  return (
    <>
      {Array.isArray(chatList) &&
        chatList.length === 0 &&
        <NoChatContainer>
          <i className="far fa-comment-dots fa-5x" />
          <NoChatTitle>{t('chats.no_chats')}</NoChatTitle>
          <NoChatText>{t('chats.if_sitter')}</NoChatText>
          <NoChatText>
            {t('chats.if_owner')}&nbsp;
            <LinkButton variant="colored" to="/find">
              {t('chats.find_sitter')}
            </LinkButton>
          </NoChatText>
        </NoChatContainer>
      }

      {Array.isArray(chatList) &&
        chatList.length > 0 &&
        <MainContainer mobileScreenView={mobileScreenView}>
          <ChatList
            allChats={chatList}
            clickedChat={clickedChat}
            hoveredChat={hoveredChat}
            setHoveredChat={setHoveredChat}
            onFetchConversation={onFetchConversation}
          />

          <Conversation
            t={t}
            FormProvider={FormProvider}
            methods={methods}
            conversationInfo={conversationInfo}
            allMessages={allMessages}
            onSubmitMessage={onSubmitMessage}
            chatContainerRef={chatContainerRef}
            backToList={backToList}
            goToInfo={goToInfo}
            inputRef={inputRef}
            inputHeight={inputHeight}
            scrollHeight={scrollHeight}
            onChangeHeight={onChangeHeight}
          />

          <ConversationInfo
            info={conversationInfo}
            backToConversation={backToConversation}
            mobileScreenView={mobileScreenView}
          />
        </MainContainer>
      }
    </>
  );
}

export default Chat;
