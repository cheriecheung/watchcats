import styled, { css } from 'styled-components';

// const NavHeight = 7;
// const MainContainerHeight = 100 - NavHeight;

const scrollBarWidth = css`
  ::-webkit-scrollbar{
    width: 0.6em;
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
`

export const MainContainer = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
`;

export const ChatListContainer = styled.div`
  width: 25%; 
  height: 100%;
  background: #fff;
`

export const ChatListLayer = styled.div`
  height: 100vh;
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
 
  ${scrollableLayerStyle}
  ${scrollBarWidth}
`;

export const ChatListSubLayer = styled.div`
  visibility: visible;
`;

// Chat List

export const ListItemContainer = styled.div`
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
  width: 50%;
  overflow: hidden;
`

export const ConversationLayer = styled.div`
  padding: 0 20px;
  
  ${scrollableLayerStyle}
  ${scrollBarWidth}
`;

export const ConversationSubLayer = styled.div`
  visibility: visible;
`;

export const SubmitButton = styled.button`
  background: none;
  color: #ffa195;
  border: none;
  outline: none;
  padding: 0 10px;
`

export const MessageInputContainer = styled.div`
  padding: 13px 20px;
  display: flex;
`;

export const ConversationInfoContainer = styled.div`
  width: 25%;
  background-color: #fff;
  overflow: hidden;
`;