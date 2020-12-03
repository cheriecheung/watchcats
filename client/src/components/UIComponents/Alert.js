import React from 'react'
import PropTypes from 'prop-types';
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

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  style: PropTypes.object
};