// components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="modal">
        {children}
      </div>
    )
  );
};

export default Modal;
