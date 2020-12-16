import React from 'react';
import { useTranslation } from 'react-i18next';
import LinkButton from './Button/LinkButton'
import styled from 'styled-components';

const Container = styled.div`

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
      <h5>The profile you're looking for doesn't exist...</h5>
      <p>Let's head back home or explore some other pages</p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Row>
          <LinkButton to="/">Home</LinkButton>
          <Icon className="fas fa-arrow-right" />
        </Row>
        <Row>
          <LinkButton to="/find">Find a cat sitter</LinkButton>
          <Icon className="fas fa-arrow-right" />
        </Row>
        <Row>
          <LinkButton to="/about">About</LinkButton>
          <Icon className="fas fa-arrow-right" />
        </Row>
        <Row>
          <LinkButton to="/account">Account</LinkButton>
          <Icon className="fas fa-arrow-right" />
        </Row>
      </div>
    </Container>
  )
}

function DefaultNotFound() {
  return (
    <>
      <h1>404</h1>
      <h3>Not found</h3>
    </>
  )
}