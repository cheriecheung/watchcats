import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const defaultMapContainer = ({ variant }) => {
  if (!variant) return css`
    height: 40vh;
  `;

  return css``;
};

const findCatSitter = ({ variant }) => {
  if (variant !== 'findCatSitter') return css``

  return `
    height: 65vh;
    top: 20px;
    position: sticky;
    margin-top: 30px;

    @media (max-width: 990px) {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    @media (max-width: 770px) {
      height: 65vh;
    }
  `
}

const MapContainer = styled.div`
  ${defaultMapContainer}
  ${findCatSitter}
`

export default MapContainer;

MapContainer.propTypes = {
  variant: PropTypes.string
};

MapContainer.defaultProps = {
  variant: undefined
};