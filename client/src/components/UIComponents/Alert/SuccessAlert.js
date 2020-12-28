import React from 'react'
import PropTypes from 'prop-types';
import { Alert } from 'antd'

function SuccessAlert({
  children,
  showIcon = true,
  closable = false,
  style
}) {
  return (
    <Alert
      type="success"
      message={children}
      showIcon={showIcon}
      closable={closable}
      style={style}
    />
  )
}

export default SuccessAlert

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  style: PropTypes.object
};