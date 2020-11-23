import styled, { css } from 'styled-components';

const defaultStyle = css`
  margin-bottom: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  text-align: left;
`

const defaultCard = props => {
  if (!props.variant) return css`
    padding: 30px;
    
    @media (max-width: 765px) {
      padding: 15px;
      width: 90vw;
    }
  `;

  return css``;
};

const findCatSitter = props => {
  if (props.variant !== 'findCatSitter') return css``

  return `
    display: flex;
    padding: 20px;
    transition: all .3s ease-in-out;
    height: 190px;

    &:hover {
      margin-left: 10px;
      margin-right: -10px;
    }
  `
}

const bookings = props => {
  if (props.variant !== 'bookings') return css``

  return `
    position: relative;
    padding: 20px;
    width: 700px;

    @media (max-width: 765px) {
      padding: 15px;
      width: 90vw;
    }
  `
}

const HorizontalCard = styled.div`
  ${defaultStyle}

  ${defaultCard}
  ${findCatSitter}
  ${bookings}
`
export default HorizontalCard