import styled, { css } from 'styled-components';
import { themeColor } from '../../../style/theme'

// const NavHeight = 7;
// const MainContainerHeight = 100 - NavHeight;

// @media (max-width: 920px) 
// - extend ConversationtContainer
// - hide ConversationInfo

// @media (max-width: 735px) 
// - hide ChatListContainer
// - extend ConversationtContainer
// - show MobileViewTab (ConversationContiner)

const transitionStyle = css`
  transition: all .3s;
`

const scrollBarWidth = css`
  ::-webkit-scrollbar{
    width: 0.6em;
  }

  @media (max-width: 735px) {
    ::-webkit-scrollbar{
      display: none;
    }
  }
`

const scrollableLayerStyle = css`
  overflow: auto;
  visibility: hidden;
  transition: visibility 0.6s;

  &::-webkit-transition {
    visibility 0.6s;
  }

  &:hover {
    visibility: visible;
  }

  &:focus {
    visibility: visible;
  }

  @media (max-width: 735px) {
    width: 100vw;
    visibility: visible;
  }
`

export const ScrollableLayer = styled.div`
  height: 100vh;

  ${scrollableLayerStyle}
  ${scrollBarWidth}
`

export const ScrollableSubLayer = styled.div`
  visibility: visible;
`

export const MainContainer = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
`;

const getChatListPositionX = (view) => {
  switch (view) {
    case "list":
      return "translateX(0)"
    case "conversation":
      return "translateX(-100vw)"
    case "info":
      return "translateX(-200vw)"
    default:
      return "unset";
  }
}

export const ChatListContainer = styled.div`
  width: 25vw; 
  height: 100%;
  background: #fff;
  ${transitionStyle}

  @media (max-width: 920px) {
    width: 35vw;
  }

  @media (max-width: 735px) {
    width: 100vw;
    transform: ${({ mobileScreenView }) => getChatListPositionX(mobileScreenView)};
  }
`

// Chat List

export const ChatListItemContainer = styled.div`
  display: flex;
  min-height: 65px;
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  transition: 0.3s;
`;

export const TextContainer = styled.div`
  flex-basis: 80%;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const getConversationPositionX = (view) => {
  switch (view) {
    case "list":
      return "translateX(100vw)"
    case "conversation":
      return "translateX(-100vw)"
    case "info":
      return "translateX(-200vw)"
    default:
      return "unset";
  }
}

// Chat box
export const ConversationContainer = styled.div`
  width: 50vw;
  overflow: hidden;
  ${transitionStyle}

  @media (max-width: 920px) {
    width: 65vw;
    overflow: visible;
  }

  @media (max-width: 735px) {
    width: 100vw;
    transform: ${({ mobileScreenView }) => getConversationPositionX(mobileScreenView)};
  }
`

export const MobileViewTab = styled.div`
  padding: 0 13px 0 10px;
  width: 100%;
  min-height: 40px;
  height: 7vh;
  background-color: #fff;

  @media (min-width: 735px){
    display: none;
  }

  @media (max-width: 735px){
    display: flex;
    justify-content: space-between;
  }
`

export const IconButton = styled.button`
  background: none;
  color: ${themeColor.peach};
  border: none;
  outline: none !important;
`

export const ConversationScrollableLayer = styled.div`
  height: 100vh;

  ${scrollableLayerStyle}
  ${scrollBarWidth}

  @media (max-width: 735px) {
    height: 75vh;
  }
`

export const FormContainer = styled.form`
  ${transitionStyle}

  @media (max-width: 920px) {
    width: 65vw;
    overflow: visible;
  }

  @media (max-width: 735px) {
    width: 100vw;
  }
`

export const MessageInputContainer = styled.div`
  padding: 13px 20px;
  display: flex;
`;

export const SubmitButton = styled.button`
  background: none;
  color: #ffa195;
  border: none;
  outline: none;
  padding: 0 10px;
`

const getInfoPositionX = (view) => {
  switch (view) {
    case "list":
      return "translateX(0)"
    case "conversation":
      return "translateX(-100vw)"
    case "info":
      return "translateX(-200vw)"
    default:
      return "unset";
  }
}

export const ConversationInfoContainer = styled.div`
  width: 25vw;
  height: 100vh;
  background-color: #fff;
  ${transitionStyle}

  @media (max-width: 920px) {
    transform: translateX(25vw);
  }

  @media (max-width: 735px) {
    width: 100vw;
    transform: ${({ mobileScreenView }) => getInfoPositionX(mobileScreenView)};  
  }
`;