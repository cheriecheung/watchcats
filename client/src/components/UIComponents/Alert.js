import React from 'react'
import { Alert as AntAlert } from 'antd'

function Alert({ children, type, showIcon = true, closable = false, style }) {
  return (
    <AntAlert
      message={children}
      type={type}
      showIcon={showIcon}
      closable={closable}
      style={style}
    />
  )
}

export default Alert