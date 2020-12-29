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
    height: 80vh;
    top: 20px;
    bottom: 20px;
    position: sticky;

    @media (max-width: 770px) {
      height: 65vh;
    }
  `
}

const MapContainer = styled.div`
  ${defaultMapContainer}
  ${findCatSitter}
`

export default MapContainer