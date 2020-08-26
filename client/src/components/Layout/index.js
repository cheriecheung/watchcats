import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { themeColor } from '../../style/theme';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div
        style={{
          // background: 'rgba(252, 237,237, 0.5)',
          background: '#fcf4f4',
          paddingBottom: 50,
        }}
      >
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
