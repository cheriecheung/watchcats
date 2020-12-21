import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { themeColor } from '../../style/theme';
import styled from 'styled-components';

// const MainContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 30px; 

//   @media (min-width: 500px) {
//     padding: 3vw; 
//   }
// `

// const MainContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `

// height: ${props => props.isChatPage ? '50vh' : 'unset'};

const Container = styled.div`
  font-family: 'Source Sans Pro', sans-serif !important;
`

function Layout({ children }) {
  return (
    <>
      <Header />
      {/* <MainContainer> */}
      <Container
        className="content"
      >
        {children}
      </Container>
      {/* </MainContainer> */}
      {/* <Footer /> */}
    </>
  );
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired
};