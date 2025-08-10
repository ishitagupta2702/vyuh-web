import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Button from './ui/Button';
import './NotificationTest.css';

const NotificationTest = () => {
  const { addNotification } = useNotification();

  const testNotifications = () => {
    // Test all notification types
    addNotification('This is an info notification!', 'info');
    
    setTimeout(() => {
      addNotification('This is a success notification!', 'success');
    }, 500);
    
    setTimeout(() => {
      addNotification('This is a warning notification!', 'warning');
    }, 1000);
    
    setTimeout(() => {
      addNotification('This is an error notification!', 'error');
    }, 1500);
  };

  return (
    <div className="notification-test">
      <h1>Notification System Test</h1>
      <p>Click the button below to test all notification types:</p>
      
      <Button onClick={testNotifications} variant="primary" size="large">
        Test All Notifications
      </Button>
      
      <div className="test-info">
        <h3>What to expect:</h3>
        <ul>
          <li>Info notification (blue) - appears immediately</li>
          <li>Success notification (green) - appears after 0.5 seconds</li>
          <li>Warning notification (orange) - appears after 1 second</li>
          <li>Error notification (red) - appears after 1.5 seconds</li>
        </ul>
        
        <p><strong>Note:</strong> All notifications will automatically disappear after 4 seconds, or you can click on them to dismiss them immediately.</p>
      </div>
    </div>
  );
};

export default NotificationTest;