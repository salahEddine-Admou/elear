import React from 'react';
import '../styles/CustomAlert.css'; // Ensure you have this CSS file for styling

const CustomAlert = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <p className='font-bold'>{message}</p>
        <button onClick={onClose} className='font-bold'>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;
