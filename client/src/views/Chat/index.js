import React from 'react';
import { LinkButton, ResponseDisplayTemplate } from '../../components/UIComponents'
import { MainContainer, NoChatContainer } from './styledComponents'
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
    chatList,
    unreadChats,
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
    message,
    setMessage
  } = useChat();

  return (
    <>
      {Array.isArray(chatList) &&
        chatList.length === 0 &&
        <NoChatContainer>
          <ResponseDisplayTemplate
            icon={<i className="far fa-comment-dots fa-5x" />}
            title={t('chats.no_chats')}
            text={
              <>
                {t('chats.if_sitter')}
                <br />
                {t('chats.if_owner')}
                <LinkButton variant="colored" to="/find" style={{ lineHeight: '2rem' }}>
                  &nbsp;{t('chats.find_sitter')}
                </LinkButton>
              </>
            }
          />
        </NoChatContainer>
      }

      {Array.isArray(chatList) &&
        chatList.length > 0 &&
        <MainContainer mobileScreenView={mobileScreenView}>
          <ChatList
            allChats={chatList}
            unreadChats={unreadChats}
            clickedChat={clickedChat}
            hoveredChat={hoveredChat}
            setHoveredChat={setHoveredChat}
            onFetchConversation={onFetchConversation}
          />

          <Conversation
            t={t}
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
            message={message}
            setMessage={setMessage}
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
