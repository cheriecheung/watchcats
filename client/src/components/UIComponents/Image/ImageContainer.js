import styled, { css } from 'styled-components';

const defaultStyle = css`
  overflow: hidden;
`
const defaultContainer = props => {
  if (!props.variant) return css`
    width: ${props.size ? props.size : '100px'};
    height:  ${props.size ? props.size : '100px'};
    border-radius: 10px;
  `

  return css``
}

const findCatSitter = props => {
  if (props.variant !== 'findCatSitter') return css``

  return `
    flex-basis: 26%;
    margin: 0 15px 0 -20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  `
}

const bookings = props => {
  if (props.variant !== 'bookings') return css``

  return `
    width: 140px;
    height: 140px;
    margin-left: -20px;
    margin-right: 15px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;

    @media (max-width: 500px) {
      width: 80px;
      height: 80px;
      margin-left: -15px;
    }

    @media (max-width: 380px) {
      width: 60px;
      height: 60px;
      margin-left: -15px;
    }
  `
}

const ImageContainer = styled.div`
  ${defaultStyle}

  ${defaultContainer}
  ${findCatSitter}
  ${bookings}
`

export default ImageContainer;
