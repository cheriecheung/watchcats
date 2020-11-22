import React from 'react'
import styled from 'styled-components';

const DefaultHorizontalCard = styled.div`
  text-align: left;
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  
  @media (max-width: 765px) {
    padding: 15px;
    width: 90vw;
  }
`;
// box-shadow: 0px 0px 40px 0px rgba(212, 170, 185, 0.3);

const FindCatSitterHorizontalCard = styled.div`
  text-align: left;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
  padding: 20px;
  transition: all .3s ease-in-out;
  height: 190px;

  &:hover {
    margin-left: 10px;
    margin-right: -10px;
  }
`

const BookingsHorizontalCard = styled.div`
  position: relative;
  text-align: left;
  padding: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: visible;
  width: 700px;

  @media (max-width: 765px) {
    padding: 15px;
    width: 90vw;
  }
`

function HorizontalCard({ variant, children }) {
  switch (variant) {
    case 'findCatSitter':
      return <FindCatSitterHorizontalCard>{children}</FindCatSitterHorizontalCard>
    case 'bookings':
      return <BookingsHorizontalCard>{children}</BookingsHorizontalCard>
    default:
      return <DefaultHorizontalCard>{children}</DefaultHorizontalCard>
  }
}

export default HorizontalCard;
