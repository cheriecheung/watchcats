import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 7vh;
  width: 100%;
  font-family: 'Source Sans Pro', sans-serif !important;
`

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="content">
        {children}
        <Footer />
      </Container>
    </>
  );
}

export default Layout