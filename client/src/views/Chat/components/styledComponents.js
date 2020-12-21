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

const buttonStyle = css`
  background: none;
  color: ${themeColor.peach};
  border: none;
  outline: none !important;
`

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

const getPositionX = (view) => {
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

export const MainContainer = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  ${transitionStyle}

  @media (max-width: 735px) {
    transform: ${({ mobileScreenView }) => getPositionX(mobileScreenView)};
  }
`;

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
  }
`

export const ChatListScrollableLayer = styled.div`
  height: 100vh;

  ${scrollableLayerStyle}
  ${scrollBarWidth}

  @media (max-width: 920px) {
    width: 35vw;
  }

  @media (max-width: 735px) {
    width: 100vw;
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
  }
`

export const MobileViewTab = styled.div`
  padding: 0 13px 0 10px;
  width: 100%;
  min-height: 40px;
  height: 7vh;
  background-color: #fff;

  @media (min-width: 920px){
    display: none;
  }

  @media (max-width: 920px){
    display: flex;
    justify-content: space-between;
  }
`

export const IconButton = styled.button`
  ${buttonStyle}


  @media (max-width: 920px){
    :first-child {
      visibility: hidden;
    }
  }

  @media (max-width: 735px){
    :first-child {
      visibility: visible;
    }
  }
`

export const BackButton = styled.button`
  ${buttonStyle}
`

export const ConversationScrollableLayer = styled.div`
  height: 83vh;

  ${scrollableLayerStyle}
  ${scrollBarWidth}

  @media (max-width: 920px) {
    height: 75vh;
  }

  @media (max-width: 735px) {
    height: 75vh;
  }
`

export const FormContainer = styled.form`
  height: 100%;
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
  display: flex;
  padding: 13px 20px;
`;

export const SubmitButton = styled.button`
  padding: 0 10px;
  background: none;
  color: #ffa195;
  border: none;
  outline: none;
`

export const ConversationInfoContainer = styled.div`
  width: 25vw;
  height: 100vh;
  background-color: #fff;
  ${transitionStyle}

  @media (max-width: 920px) {
    width: ${({ isTranslateX }) => isTranslateX ? '65vw' : 'unset'};
    transform: ${({ isTranslateX }) => isTranslateX ? 'translateX(-65vw)}' : 'unset'};
  }

  @media (max-width: 735px) {
    width: 100vw;
    transform: ${({ isTranslateX }) => isTranslateX ? 'translateX(0vw)}' : 'unset'};
  }
`;

// @media (max-width: 920px) {
//   transform: translateX(25vw);
// }

export const ConversationInfoLayer = styled.div`
  ${scrollableLayerStyle}
  ${scrollBarWidth}

  @media (max-width: 920px) {
    width: 65vw;
  }

  @media (max-width: 735px) {
    width: 100vw;
  }
`