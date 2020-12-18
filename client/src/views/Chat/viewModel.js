import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatList, getChatConversation, concatLatestMessage } from '../../redux/chat/actions';
import io from "socket.io-client";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let socket;

function useChat() {
  const { t } = useTranslation();
  const { id: recipientId } = useParams();
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { chatList, conversationInfo, allMessages } = useSelector((state) => state.chat);
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    let server = process.env.REACT_APP_API_DOMAIN;

    dispatch(getChatList());

    socket = io(server);

    socket.on("Output Chat Message", messageFromBackend => {
      console.log({ messageFromBackend })
      dispatch(concatLatestMessage(messageFromBackend));
    })

    return () => {
      // does not disconnect here
      socket.emit('disconnect');
      socket.off();
    };
  }, [])

  useEffect(() => {
    if (recipientId) {
      console.log("sendinggggg")
      dispatch(getChatConversation(recipientId));
    }
    // if no id, redirect to where?
  }, [recipientId])

  const scrollToBottom = () => {
    const scroll = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;

    chatContainerRef.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const onChangeMessageContent = (e) => {
    setCurrentMessage(e.target.value)
  }

  const onSubmitMessage = (data) => {
    socket.emit('Input Chat Message', {
      message: data.messageInput,
      sender: cookies.get('shortId'),
      recipient: recipientId,
    });

    console.log({ messageFromFrontend: data })
    // reset(defaultValues);
  };

  return {
    t,
    chatList,
    conversationInfo,
    allMessages,
    currentMessage,
    onChangeMessageContent,
    onSubmitMessage,
    chatContainerRef
  }
}

export { useChat }