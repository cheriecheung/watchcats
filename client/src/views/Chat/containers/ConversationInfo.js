import React from 'react';
import { Image, ImageContainer, LinkButton } from '../../../components/UIComponents'

function ConversationInfo({ info }) {
  const { shortId } = info || {}

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        borderBottom: '1px solid #E8E8E8',
      }}
    >
      <ImageContainer>
        <Image url="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      </ImageContainer>
      <h5 style={{ margin: '15px 0 3px 0' }}>Anna C</h5>
      <span style={{ color: '#929292' }}>Active 1h ago</span>

      <LinkButton to={`/profile/catsitter/${shortId}`}>View cat sitter profile</LinkButton>
      <LinkButton to={`/profile/catowner/${shortId}`}>View cat owner profile</LinkButton>
    </div>
  );
}

export default ConversationInfo;
