// components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="modal">
        {children}
        <button onClick={onClose}>Cancel</button>
      </div>
    )
  );
};

export default Modal;
