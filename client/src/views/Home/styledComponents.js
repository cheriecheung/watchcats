import styled from 'styled-components'

export const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  padding: 150px 0 50px 0;

  @media (max-width: 850px) {
    padding: 150px 50px 50px 50px;
    width: unset;
  }

  @media (max-width: 500px) {
    padding: 150px 4vw 50px 4vw;
  }
`

export const RelaxCatContainer = styled.div`
  position: absolute;
  display: flex; 
  justify-content: flex-end;
  width: 830px; 

  @media (max-width: 850px) {
    width: 90%; 
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const FormContainer = styled.form`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const FieldContainer = styled.div`
  flex-basis: 42%;
  margin-right: 10px;

  @media (max-width: 650px) {
    flex-basis: unset;
    margin-right: 0;
    margin-bottom: 15px;
  }
`
