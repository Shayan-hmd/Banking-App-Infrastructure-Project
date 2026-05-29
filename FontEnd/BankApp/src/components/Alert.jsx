import React, { useEffect } from 'react';
import { alertState, closeAlert } from '../core/AlertManager';

export default function Alert() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [title, setTitle] = React.useState("Alert");
  const [type, setType] = React.useState("error");
  
  useEffect(() => {
    // Subscribe to alert state changes
    const unsubVisible = alertState.isVisible.subscribe(() => {
      setIsVisible(alertState.isVisible.value);
    });
    const unsubMessage = alertState.message.subscribe(() => {
      setMessage(alertState.message.value);
    });
    const unsubTitle = alertState.title.subscribe(() => {
      setTitle(alertState.title.value);
    });
    const unsubType = alertState.type.subscribe(() => {
      setType(alertState.type.value);
    });
    
    return () => {
      unsubVisible();
      unsubMessage();
      unsubTitle();
      unsubType();
    };
  }, []);
  
  const handleConfirm = () => {
    if (alertState.onConfirm.value) {
      alertState.onConfirm.value();
    }
    closeAlert();
  };
  
  if (!isVisible) return null;
  
  // Get styles based on alert type
  const getTypeStyles = () => {
    switch(type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          icon: '✓'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-500',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700',
          buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
          icon: '⚠'
        };
      case 'info':
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700',
          buttonBg: 'bg-blue-600 hover:bg-blue-700',
          icon: 'ℹ'
        };
      default: // error
        return {
          bg: 'bg-red-100',
          border: 'border-red-500',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700',
          buttonBg: 'bg-red-600 hover:bg-red-700',
          icon: '✗'
        };
    }
  };
  
  const styles = getTypeStyles();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${styles.bg} border-l-8 ${styles.border} rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 ${styles.buttonBg} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
              {styles.icon}
            </div>
            <h2 className={`text-xl font-bold ${styles.titleColor}`}>
              {title}
            </h2>
          </div>
          
          <p className={`${styles.messageColor} mb-6 text-lg`}>
            {message}
          </p>
          
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className={`${styles.buttonBg} text-white font-bold py-2 px-6 rounded-lg transition duration-300 focus:outline-none`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}