import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChatList,
  getChatConversation,
  concatLatestMessage,
  emptyConversation
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
  const { id: recipientId } = useParams();
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { chatList, conversationInfo, messages: allMessages } = useSelector((state) => state.chat);

  const [clickedChat, setClickedChat] = useState('');
  const [hoveredChat, setHoveredChat] = useState('');

  // list, conversation, info
  const [mobileScreenView, setMobileScreenView] = useState('list')

  const defaultValues = { messageInput: '' };
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, watch, reset } = methods;

  // console.log({ chatList, conversationInfo, allMessages })

  useEffect(() => {
    // chat container should start at bottom

    let server = process.env.REACT_APP_API_DOMAIN;

    dispatch(getChatList());

    const token = getAccessToken();
    socket = io(server, { query: { token } });

    socket.on("Output Chat Message", messageFromBackend => {
      console.log({ messageFromBackend })
      dispatch(concatLatestMessage(messageFromBackend));
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

  const scrollToBottom = () => {
    const scroll = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;

    chatContainerRef.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const onSubmitMessage = (data) => {
    socket.emit('Input Chat Message', {
      message: data.messageInput,
      recipient: recipientId,
    });

    console.log({ messageFromFrontend: data })
    reset(defaultValues);
  };

  return {
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
  }
}

export { useChat }