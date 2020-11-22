import styled from 'styled-components';

const WrapLayout = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 769px) {
      flex-direction: row;
  }
`

export default WrapLayout