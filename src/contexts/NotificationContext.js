import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { id, message, type, timestamp: Date.now() };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      setNotifications(current => current.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(current => current.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ 
      addNotification, 
      removeNotification, 
      clearAllNotifications,
      notifications 
    }}>
      {children}
      <div id="notification-container" className="notification-container">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification ${notification.type} show`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="notification-content">
              <span className="notification-message">{notification.message}</span>
              <button 
                className="notification-close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};