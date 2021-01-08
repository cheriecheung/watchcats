import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChatList,
  getChatConversation,
  concatLatestMessage,
  emptyConversation,
  updateChatList
} from '../../redux/chat/actions';
import io from "socket.io-client";
import { getAccessToken } from '../../utility/accessToken';
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let socket;

function useChat() {
  const { screenWidth } = ScreenWidthListener();

  const history = useHistory();
  const { t } = useTranslation();
  const params = useParams();
  const { id: recipientId } = params || {}
  const myUrlId = cookies.get('shortId')

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { chatList, conversationInfo, messages: allMessages } = useSelector((state) => state.chat);
  const { unreadChats } = useSelector((state) => state.notifications);

  const [clickedChat, setClickedChat] = useState('');
  const [hoveredChat, setHoveredChat] = useState('');

  const [inputHeight, setInputHeight] = useState("4rem");
  const [scrollHeight, setScrollHeight] = useState("");

  // list, conversation, info
  const [mobileScreenView, setMobileScreenView] = useState('list')

  const [message, setMessage] = useState("");

  // console.log({ chatList, conversationInfo, allMessages })

  useEffect(() => {
    // chat container should start at bottom
    let server = process.env.REACT_APP_API_DOMAIN;

    dispatch(getChatList());

    const token = getAccessToken();
    socket = io(server, { query: { token } });

    socket.on("Output Chat Message", dataFromBackend => {
      const { newMessage, updatedChatList } = dataFromBackend

      dispatch(concatLatestMessage(newMessage));
      dispatch(updateChatList(updatedChatList))
    })

    return () => {
      // does not unmount here 
      dispatch(emptyConversation())
      // does not disconnect here
      socket.emit('disconnect');
      socket.off();
    };
  }, [])

  useEffect(() => {
    if (screenWidth >= 735 && Array.isArray(chatList) && chatList.length > 0) {
      setClickedChat(chatList[0]._id)
    }

    if (!recipientId && screenWidth >= 735 && Array.isArray(chatList) && chatList.length > 0) {
      const { participant1, participant2 } = chatList[0] || {}
      const recipient = participant1 ? participant1 : participant2
      const recipientUrlId = recipient.urlId
      history.push(`/messages/${recipientUrlId}`)
      console.log({ chatList })
    }
  }, [chatList])

  useEffect(() => {
    if (recipientId) {
      dispatch(getChatConversation(recipientId));
    }

    if (recipientId === myUrlId) {
      history.push(`/messages`)
    }
  }, [recipientId])

  function onFetchConversation(recipientShortId, conversationId) {
    history.push(`/messages/${recipientShortId}`)
    setClickedChat(conversationId)
    setMobileScreenView('conversation')

    if (recipientId === recipientShortId) {
      dispatch(getChatConversation(recipientShortId));
    }
  }

  function backToList() {
    setMobileScreenView('list')
    dispatch(emptyConversation())
  }

  function backToConversation() {
    setMobileScreenView('conversation')
  }

  function goToInfo() {
    setMobileScreenView('info')
  }

  const onChangeHeight = () => {
    if (inputRef && inputRef.current) {
      let scroll_height = inputRef.current.scrollHeight;

      if (scroll_height <= 52) {
        inputRef.current.style.height = 4 + "rem";
      }

      if (scroll_height > 52 && scroll_height < 150) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      }

      if (scroll_height > 150) {
        inputRef.current.style.height = 150 + "px";
      }

      // console.log({ scroll_height });

      setInputHeight(inputRef.current.style.height);
      setScrollHeight(scroll_height);
      scrollToBottom();
    }

    return;
  };

  const scrollToBottom = () => {
    if (chatContainerRef && chatContainerRef.current) {
      const scroll = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;

      chatContainerRef.current.scrollTo(0, scroll);
    }

    return;
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const onSubmitMessage = (e) => {
    e.preventDefault();

    socket.emit('Input Chat Message', {
      message,
      recipient: recipientId,
    });

    setMessage('')
  };

  return {
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
  }
}

export { useChat }