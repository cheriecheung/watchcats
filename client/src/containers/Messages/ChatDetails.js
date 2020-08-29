import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  background: pink;
  overflow: hidden;
  border-radius: 10px;
`;

function ChatDetails() {
  return (
    <div>
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
          <img
            src="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="pic"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </ImageContainer>
        <h5 style={{ margin: '15px 0 3px 0' }}>Anna C</h5>
        <span style={{ color: '#929292' }}>Active 1h ago</span>
      </div>
    </div>
  );
}

export default ChatDetails;
