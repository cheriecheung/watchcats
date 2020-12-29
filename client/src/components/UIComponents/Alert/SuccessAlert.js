import React from 'react'
import PropTypes from 'prop-types';
import { Alert } from 'antd'

function SuccessAlert({
  message,
  showIcon = true,
  closable = false,
  style
}) {
  return (
    <Alert
      type="success"
      message={message}
      showIcon={showIcon}
      closable={closable}
      style={style}
    />
  )
}

export default SuccessAlert

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  style: PropTypes.object
};