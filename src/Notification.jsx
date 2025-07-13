import React from 'react';
import './Notification.css';

function Notification({ message, show }) {
  if (!show) return null;
  return (
    <div className="notification-popup">
      {message}
    </div>
  );
}

export default Notification;
