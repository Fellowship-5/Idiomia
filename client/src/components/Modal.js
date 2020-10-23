import React from "react";
import { Modal as ModalBootstrap } from "react-bootstrap";

const Modal = ({ children, isOpen, modalClose, dialogClassName, centered }) => {
  return (
    <ModalBootstrap
      dialogClassName={dialogClassName}
      centered={centered}
      show={isOpen}
      onHide={modalClose}
    >
      <ModalBootstrap.Header className="border-bottom-0" closeButton />
      {children}
    </ModalBootstrap>
  );
};

export default Modal;
