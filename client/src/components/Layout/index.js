import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={{ padding: '20px 5%' }}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
