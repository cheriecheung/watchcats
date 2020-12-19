import React from 'react';
import { InboxContainer, InboxPartContainer, ListContainer, ListContent } from './components/styledComponents'
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
    conversationInfo,
    allMessages,
    onSubmitMessage,
    chatContainerRef
  } = useChat();

  return (
    <InboxContainer className="message-inbox">
      <ListContainer
        width={ListWidth}
        backgroundOpacity={0.8}
        borderRight="1px solid #E8E8E8"
        hoverOverflowY="auto"
      >
        <ListContent>
          {chatList &&
            chatList.map(item =>
              <ChatListItem
                key={item.id}
                item={item}
                clickedChat={clickedChat}
              />
            )
          }
        </ListContent>
      </ListContainer>
      <InboxPartContainer width={ChatWidth} backgroundOpacity={0.2} hoverOverflowY="hidden">
        <Conversation
          FormProvider={FormProvider}
          methods={methods}
          conversationInfo={conversationInfo}
          allMessages={allMessages}
          onSubmitMessage={onSubmitMessage}
          chatContainerRef={chatContainerRef}
        />
      </InboxPartContainer>
      <InboxPartContainer
        width={ChatDetailsWidth}
        backgroundOpacity={0.8}
        borderLeft="1px solid #E8E8E8"
        hoverOverflowY="auto"
      >
        <ConversationInfo info={conversationInfo} />
      </InboxPartContainer>
    </InboxContainer>
  );
}

export default Chat;
