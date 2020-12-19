import styled from 'styled-components';

// Chat List

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