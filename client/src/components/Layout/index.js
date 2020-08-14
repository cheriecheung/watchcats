import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { themeColor } from '../../style/theme';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div
        //style={{ padding: '20px 5%' }}
        style={{ background: 'rgba(211, 226, 223, 0.5)' }}
      >
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
