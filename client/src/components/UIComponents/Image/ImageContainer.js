import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const defaultStyle = css`
  overflow: hidden;
`
const defaultContainer = ({ variant, size }) => {
  if (!variant) return css`
    width: ${size ? size : '100px'};
    height:  ${size ? size : '100px'};
    border-radius: 10px;
  `

  return css``
}

const findCatSitter = ({ variant }) => {
  if (variant !== 'findCatSitter') return css``

  return `
    flex-basis: 26%;
    margin: 0 15px 0 -20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 130px;

    @media (max-width: 680px) {
      flex-basis: unset;
      width: 120px;
      height: 120px;
    }

    @media (max-width: 600px) {
      width: 100px;
      height: 100px;
    }
  `
}

const bookings = ({ variant }) => {
  if (variant !== 'bookings') return css``

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

ImageContainer.propTypes = {
  variant: PropTypes.node,
  size: PropTypes.string
};

ImageContainer.defaultProps = {
  variant: undefined,
  size: undefined
};