import React from 'react';
import { LinkButton } from '../../../../components/UIComponents'

function Successful({ t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span>Activation successful. You are now able to <LinkButton to="/login">log in</LinkButton>.</span>
    </div>
  )
}

export default Successful