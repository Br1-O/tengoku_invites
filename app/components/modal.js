// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="float-right text-red-500 bg-white bg-opacity-50 rounded-3xl p-1">
          ✖
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;