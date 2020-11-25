import React from 'react';
import styled from 'styled-components';
import { Modal as AntModal } from 'antd';

const StyledAntModal = styled(AntModal)`
  text-align: center !important;

  & > .ant-modal-content {
    border-radius: 10px;
  }
`
// margin: 0 !important;
// padding: 0 !important;

// @media (max-width: 500px) {
//   & > .ant-modal-content {
//     width: auto !important;
//     height: 96vh !important;
//     margin: 2vw !important;

//     display: flex;
//     justify-content: center;
//     align-content: center;
//     flex-direction: column;
//   }
// }

function Modal({
  visible,
  onOk = null,
  onCancel = null,
  okButtonProps = {},
  cancelButtonProps = {},
  closable = true,
  maskClosable = false,
  footer,
  style,
  children
}) {
  return (
    <StyledAntModal
      centered
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      footer={footer}
      closable={closable}
      maskClosable={maskClosable}
      style={style}
    >
      {children}
    </StyledAntModal>
  )
}

export default Modal