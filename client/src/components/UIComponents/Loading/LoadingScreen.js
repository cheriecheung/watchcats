import React from 'react'
import logo from '../../../assets/images/logo.png';
import Spinner from './Spinner';

function LoadingScreen() {
  return (

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <Spinner colored={true.toString()} style={{ marginLeft: 0 }} />
      <div style={{ width: 60, height: 60, marginTop: 15 }}>
        <img
          src={logo}
          alt="watchcats-logo"
          width="100%"
        />
      </div>
    </div>
  )
}

export default LoadingScreen;