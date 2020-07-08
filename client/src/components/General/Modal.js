import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalComponent({ show, onHide, style, children }) {
  return (
    <Modal
      size="100px"
      show={show}
      onHide={onHide}
      style={{ overflow: "hidden" }}
      centered
    >
      <Modal.Header
        style={{ padding: 10, paddingTop: 5 }}
        closeButton
      ></Modal.Header>
      <Modal.Body style={{ padding: 20, paddingTop: 0, ...style }}>
        {children}
      </Modal.Body>
    </Modal>
  );
}
