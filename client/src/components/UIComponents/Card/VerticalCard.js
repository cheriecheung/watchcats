import styled, { css } from 'styled-components';

const defaultStyle = css`
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const authentication = ({ variant }) => {
  if (variant !== 'authentication') return css``;

  return css`
    width: 400px;
    padding: 30px;
    text-align: left;
    
    @media (max-width: 550px) {
      padding: 40px;
      width: 90vw;
    }
  `;
};

const profileSummary = ({ variant }) => {
  if (variant !== 'profileSummary') return css``;

  return css`
    position: sticky;
    top: 20px;
    display: inline-block;
    flex-basis: 35%;
    height: 100%;

    @media (max-width: 900px) {
      position: initial;
      margin-bottom: 35px;
      padding: 25px;
    }
  `;
}

const profileDetails = ({ variant }) => {
  if (variant !== 'profileDetails') return css``;

  return css`
    flex-basis: 60%;
    padding: 25px;
  `
}

const VerticalCard = styled.div`
  ${defaultStyle}

  ${authentication}
  ${profileSummary}
  ${profileDetails}
`;

export default VerticalCard;
