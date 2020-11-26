import styled, { css } from 'styled-components';

const defaultStyle = css`
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const authentication = props => {
  if (props.variant !== 'authentication') return css``;

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

const VerticalCard = styled.div`
  ${defaultStyle}

  ${authentication}
`;

export default VerticalCard;
