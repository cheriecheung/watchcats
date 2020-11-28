import styled, { css } from 'styled-components';

const defaultStyle = css`
  margin-bottom: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  text-align: left;
`
// overflow: hidden;

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
    flex-direction: column;
    padding: 20px;
    width: 100%;
    height: ${props.hover ? '190px' : 'unset'};
    transition: all .3s ease-in-out;

    &:hover {
      margin-left: ${props.hover && '10px'};
      margin-right: ${props.hover && '-10px'};
    }

    @media (max-width: 680px) {
      &:hover {
        margin-left: unset;
        margin-right: unset;
      }
    }

    @media (max-width: 600px) {
      height: unset;
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