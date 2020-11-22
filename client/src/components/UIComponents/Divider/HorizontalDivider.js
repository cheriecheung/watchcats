import React from 'react'
import { Divider } from 'antd';

function HorizontalDivider({ children }) {
  return (
    children ?
      <Divider plain style={{ margin: '15px 0' }}>
        {children}
      </Divider>
      :
      <hr style={{ margin: '15px 0' }} />
  )
}

export default HorizontalDivider