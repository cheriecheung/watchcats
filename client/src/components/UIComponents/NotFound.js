import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton, VerticalCard } from '../UIComponents'
import styled from 'styled-components';
import { themeColor, themeLayout } from '../../style/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -20px auto 0 auto;
  width: 90%;
  height: ${themeLayout.contentHeight};
`

const Row = styled.div`
  margin: 5px 0;
  display: flex;
  flex-directions: row;
  justify-content: center;
`

const Icon = styled.i`
  margin-left: 10px;
  align-self: center;
`

function NotFound({ variant }) {
  switch (variant) {
    case 'error':
      return <Error />
    case 'profile':
      return <ProfileNotFound />
    default:
      return <DefaultNotFound />
  }
}

export default NotFound

function Error() {
  return (
    <>
      <h1>Error occured</h1>
      <h3>Please try refreshing the page or check if the link is valid.</h3>
    </>
  )
}

function ProfileNotFound() {
  return (
    <Container>

    </Container>
  )
}

function DefaultNotFound() {
  return (
    <Container>
      <VerticalCard>
        <i className="far fa-surprise fa-5x" style={{ color: themeColor.lightGrey }} />
        <br /><br />
        <h6 style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Not Found</h6>
        <span>The page you're looking for doesn't exist...</span>
        <br />
        <span>Let's head back home or explore some other pages</span>

        <br />
        <br />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Row>
            <LinkButton to="/" variant="colored">Home</LinkButton>
            <Icon className="fas fa-arrow-right" />
          </Row>
          <Row>
            <LinkButton to="/find" variant="colored">Find a cat sitter</LinkButton>
            <Icon className="fas fa-arrow-right" />
          </Row>
          <Row>
            <LinkButton to="/about" variant="colored">About</LinkButton>
            <Icon className="fas fa-arrow-right" />
          </Row>
          <Row>
            <LinkButton to="/account" variant="colored">Account</LinkButton>
            <Icon className="fas fa-arrow-right" />
          </Row>
        </div>
      </VerticalCard>
    </Container>
  )
}