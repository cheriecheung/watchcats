import styled, { css } from 'styled-components';
import { themeColor, themeLayout } from '../../style/theme'

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
  height: ${themeLayout.contentHeight};

  ${scrollableLayerStyle}
  ${scrollBarWidth}
`

export const ScrollableSubLayer = styled.div`
  visibility: visible;
  overflow-x: hidden;
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

export const NoChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${themeLayout.contentHeight};
  background-color: #fff;
  color: ${themeColor.lightGrey};
`

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
  height: ${themeLayout.contentHeight};

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

export const ContactName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${themeColor.darkGrey};
`

export const DateDisplay = styled.span`
  color: ${themeColor.grey};
  font-size: 0.9rem;
`

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

export const MobileViewTabContainer = styled.div`
  padding: 0 13px 0 10px;
  width: 100%;
  min-height: 40px;
  height: ${themeLayout.navBarHeight};
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
  position: absolute;
  top: 0;
  bottom: ${({ bottom }) => bottom};
  padding: 10px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  ${scrollableLayerStyle}
  ${scrollBarWidth}
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

export const AutoSizeInput = styled.textarea`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px;
  width: 90%;
  height: 4rem;
  border: 10px solid ${themeColor.lightPeach};
  border-radius: 20px;
  font-size: 1.4rem;
  overflow-x: hidden;
  overflow-y: ${({ scrollHeight }) =>
    scrollHeight >= 150 ? "scroll" : "hidden"};
  resize: none;
  outline: none;

  &:hover {
    border: 10px solid ${themeColor.lightPeach} !important;
    box-shadow: none !important;
  }
`;

export const SubmitButton = styled.button`
  padding: 0 10px;
  background: none;
  color: #ffa195;
  border: none;
  outline: none;
  float: right;
`

export const ConversationInfoContainer = styled.div`
  width: 25vw;
  height: ${themeLayout.contentHeight};
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

export const Field = styled.tr`
  display: flex;
`

export const FieldLabel = styled.td`
  width: 28%;
  margin-bottom: 0;
  font-weight: bold;

  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FieldItem = styled.td`
`

const autoMessageStyle = css`
  background-color: #FFF;
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
`

export const DefaultAutoMessageStyle = styled.span`
  ${autoMessageStyle}
  color: ${themeColor.grey};
`

export const AlternateAutoMessageStyle = styled.span`
  ${autoMessageStyle}
  color: ${themeColor.green};
`