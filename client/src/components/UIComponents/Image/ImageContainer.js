import React from 'react';
import styled from 'styled-components';

const DefaultImageContainer = styled.div`
  width: ${props => props.size ? props.size : '100px'};
  height:  ${props => props.size ? props.size : '100px'};
  background: pink;
  border-radius: 10px;
  overflow: hidden;
`;

const FindCatSitterImageContainer = styled.div`
  flex-basis: 26%;
  margin: 0 15px 0 -20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
`

const BookingRecordImageContainer = styled.div`
  width: 140px;
  height: 140px;
  margin-left: -20px;
  margin-right: 15px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;

  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
    margin-left: -15px;
  }
`

function ImageContainer({ variant, size, children }) {
  switch (variant) {
    case 'findCatSitter':
      return <FindCatSitterImageContainer>{children}</FindCatSitterImageContainer>
    case 'bookings':
      return <BookingRecordImageContainer>{children}</BookingRecordImageContainer>
    default:
      return <DefaultImageContainer size={size}>{children}</DefaultImageContainer>
  }
}

export default ImageContainer;
