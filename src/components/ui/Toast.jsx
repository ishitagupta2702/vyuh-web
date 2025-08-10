import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

// Toast utility functions
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      icon: <CheckCircle size={20} />,
      duration: 4000,
      ...options
    });
  },
  
  error: (message, options = {}) => {
    return toast.error(message, {
      icon: <XCircle size={20} />,
      duration: 6000,
      ...options
    });
  },
  
  warning: (message, options = {}) => {
    return toast(message, {
      icon: <AlertCircle size={20} />,
      duration: 5000,
      className: 'toast-warning',
      ...options
    });
  },
  
  info: (message, options = {}) => {
    return toast(message, {
      icon: <Info size={20} />,
      duration: 4000,
      className: 'toast-info',
      ...options
    });
  },
  
  loading: (message, options = {}) => {
    return toast.loading(message, {
      duration: Infinity,
      ...options
    });
  },
  
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  }
};

// Toast container component
const ToastContainer = ({ 
  position = 'top-right',
  toastOptions = {},
  ...props 
}) => {
  return (
    <Toaster
      position={position}
      toastOptions={{
        className: 'toast',
        duration: 4000,
        style: {
          background: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        },
        ...toastOptions
      }}
      {...props}
    />
  );
};

export default ToastContainer;