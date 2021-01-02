import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
// import { useForm, FormProvider } from 'react-hook-form';
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

let socket;

function useChat() {
  const { screenWidth } = ScreenWidthListener();

  const history = useHistory();
  const { t } = useTranslation();
  const { id: recipientId } = useParams();

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { chatList, conversationInfo, messages: allMessages } = useSelector((state) => state.chat);

  const [clickedChat, setClickedChat] = useState('');
  const [hoveredChat, setHoveredChat] = useState('');

  const [inputHeight, setInputHeight] = useState("4rem");
  const [scrollHeight, setScrollHeight] = useState("");


  // list, conversation, info
  const [mobileScreenView, setMobileScreenView] = useState('list')

  const [message, setMessage] = useState("");

  // const defaultValues = { messageInput: '' };
  // const methods = useForm({ defaultValues });
  // const { register, handleSubmit, watch, reset } = methods;

  console.log({ chatList, conversationInfo, allMessages })

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
      setClickedChat(chatList[0].id)
    }

    if (screenWidth >= 735 && !recipientId && Array.isArray(chatList) && chatList.length > 0) {
      const shortId = chatList[0].recipient.shortId
      history.push(`/messages/${shortId}`)
    }
  }, [chatList])

  useEffect(() => {
    if (recipientId) {
      console.log("sendinggggg")
      dispatch(getChatConversation(recipientId));
    }
    // if no id, redirect to where?
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

      console.log({ scroll_height });

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
      // message: data.messageInput,
      message,
      recipient: recipientId,
    });

    setMessage('')
    // reset(defaultValues);
  };

  return {
    t,
    // FormProvider,
    // methods,
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
    message,
    setMessage
  }
}

export { useChat }