import styled from 'styled-components';

const NavHeight = 7;
const InboxContainerHeight = 100 - NavHeight;

export const InboxContainer = styled.div`
  text-align: left;
  width: 100vw;
  height: ${InboxContainerHeight}vh;
  display: flex;
`;

export const InboxPartContainer = styled.div`
  width: ${(props) => props.width}%;
  background: rgba(255, 255, 255, ${(props) => props.backgroundOpacity});
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover {
    overflow-y: ${(props) => props.hoverOverflowY};
  }
`;

export const ListContainer = styled.div`
  width: ${(props) => props.width}%;
  background: rgba(255, 255, 255, ${(props) => props.backgroundOpacity});
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
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
`;

export const ListContent = styled.div`
  border-right: 1px solid #e8e8e8;
  visibility: visible;
`;

// Chat List
// background-color: ${props => props.isClicked ? 'blue' : 'pink'};

export const ListItemContainer = styled.div`
  display: flex;
  min-height: 65px;
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// Chat box

export const ChatContainer = styled.div`
  padding: 0 20px;
  overflow: auto;
  visibility: hidden;
  transition: visibility 0.6s;
  scroll-behavior: smooth;
  
  &::-webkit-transition {
    visibility 0.6s;
  }
  &:hover {
    visibility: visible;
  }
  &:focus {
    visibility: visible;
  }
`;

export const ChatContent = styled.div`
  visibility: visible;
`;

export const MessageInputContainer = styled.div`
  padding: 13px 20px;
  display: flex;
`;