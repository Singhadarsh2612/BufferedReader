import React from 'react';
import './LoadingCircle.css';

const LoadingCircle = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default LoadingCircle;
