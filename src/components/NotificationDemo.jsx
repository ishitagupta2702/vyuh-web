import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Button from './ui/Button';
import Card from './ui/Card';
import './NotificationDemo.css';

const NotificationDemo = () => {
  const { addNotification, clearAllNotifications } = useNotification();

  const handleSuccessNotification = () => {
    addNotification('Operation completed successfully!', 'success');
  };

  const handleErrorNotification = () => {
    addNotification('Something went wrong. Please try again.', 'error');
  };

  const handleWarningNotification = () => {
    addNotification('Please review your input before proceeding.', 'warning');
  };

  const handleInfoNotification = () => {
    addNotification('Here is some helpful information for you.', 'info');
  };

  const handleMultipleNotifications = () => {
    addNotification('First notification - Info', 'info');
    setTimeout(() => addNotification('Second notification - Success', 'success'), 500);
    setTimeout(() => addNotification('Third notification - Warning', 'warning'), 1000);
    setTimeout(() => addNotification('Fourth notification - Error', 'error'), 1500);
  };

  const handleLongNotification = () => {
    addNotification(
      'This is a very long notification message that demonstrates how the notification system handles longer text content. It should wrap properly and maintain good readability.',
      'info'
    );
  };

  return (
    <div className="notification-demo">
      <Card header="Notification System Demo" padding="large">
        <p>
          This component demonstrates how to use the notification system in your React components.
          Click the buttons below to see different types of notifications.
        </p>
        
        <div className="demo-section">
          <h3>Basic Notifications</h3>
          <div className="button-grid">
            <Button onClick={handleSuccessNotification} variant="success">
              Success Notification
            </Button>
            <Button onClick={handleErrorNotification} variant="danger">
              Error Notification
            </Button>
            <Button onClick={handleWarningNotification} variant="warning">
              Warning Notification
            </Button>
            <Button onClick={handleInfoNotification} variant="primary">
              Info Notification
            </Button>
          </div>
        </div>

        <div className="demo-section">
          <h3>Advanced Features</h3>
          <div className="button-grid">
            <Button onClick={handleMultipleNotifications} variant="outline">
              Show Multiple Notifications
            </Button>
            <Button onClick={handleLongNotification} variant="ghost">
              Long Message Notification
            </Button>
            <Button onClick={clearAllNotifications} variant="secondary">
              Clear All Notifications
            </Button>
          </div>
        </div>

        <div className="demo-section">
          <h3>Usage Instructions</h3>
          <div className="usage-info">
            <p><strong>To use notifications in your component:</strong></p>
            <ol>
              <li>Import the hook: <code>import { '{ useNotification }' } from '../contexts/NotificationContext';</code></li>
              <li>Use the hook: <code>const { '{ addNotification }' } = useNotification();</code></li>
              <li>Call the function: <code>addNotification('Your message', 'success');</code></li>
            </ol>
            
            <p><strong>Available notification types:</strong></p>
            <ul>
              <li><code>'info'</code> - Blue (default)</li>
              <li><code>'success'</code> - Green</li>
              <li><code>'warning'</code> - Orange</li>
              <li><code>'error'</code> - Red</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationDemo;