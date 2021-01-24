import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 40px 0 50px 0;
  width: 1100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 1220px) {
    padding: 40px 100px 50px 100px;
    width: unset;
  }
  
  @media (max-width: 1090px) {
    padding: 30px 50px 50px 50px;
  }

  @media (max-width: 890px) {
    padding: 30px 50px 50px 50px;
  }

  @media (max-width: 500px) {
    padding: 30px 4vw 50px 4vw;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 990px) {
    flex-direction: column-reverse;
  }
`

export const ResultContainer = styled.div`
  width: 1100px; 
  flex-basis: 57%;

  @media (max-width: 1185px) {
    width: 90vw;
  }

  @media (max-width: 1100px) {
    width: 95vw;
  }

  @media (max-width: 990px) {
    width: 100%;
    flex-basis: unset;
  }

  @media (max-width: 890px) {
    width: 100%; 
    margin-top: 20px;
  }
`

export const FieldContainer = styled.div`
  flex: ${({ flex }) => flex};
  padding: 0 15px;
  align-self: center;

  @media (max-width: 915px) {
    flex: 100%;
    margin-bottom: 20px;
    padding: 0;
  }

  :last-child{
    @media (max-width: 915px) {
      margin: -5px 0 -10px 0;
    }
  }
`

export const ContentContainer = styled.div`
  flex-basis: 75%;

  @media (max-width: 680px) {
    flex-basis: 80%;
  }
`