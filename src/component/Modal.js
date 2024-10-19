import React from 'react';
import './Modal.css'; // Import updated styles

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isOpen ? 'show' : ''}`}>
        <button className="close-button" onClick={onClose}>X</button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
