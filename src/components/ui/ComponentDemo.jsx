import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Card from './Card';
import Form from './Form';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Spinner from './Spinner';
import { showToast } from './Toast';
import { useNotification } from '../../contexts/NotificationContext';
import './ComponentDemo.css';

const ComponentDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const handleFormSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    showToast.success('Form submitted successfully!');
    setIsModalOpen(false);
  };

  const handleToastDemo = () => {
    showToast.success('This is a success message!');
    showToast.error('This is an error message!');
    showToast.warning('This is a warning message!');
    showToast.info('This is an info message!');
  };

  return (
    <div className="component-demo">
      <h1>UI Components Demo</h1>
      
      {/* Button Section */}
      <section className="demo-section">
        <h2>Buttons</h2>
        <div className="demo-grid">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="success">Success Button</Button>
        </div>
        
        <div className="demo-grid">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        
        <div className="demo-grid">
          <Button loading>Loading Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>

      {/* Card Section */}
      <section className="demo-section">
        <h2>Cards</h2>
        <div className="demo-grid">
          <Card header="Default Card" padding="default">
            <p>This is a default card with some content.</p>
          </Card>
          
          <Card variant="elevated" header="Elevated Card" padding="large">
            <p>This is an elevated card with more padding.</p>
          </Card>
          
          <Card variant="outlined" header="Outlined Card">
            <p>This is an outlined card.</p>
          </Card>
          
          <Card variant="dark" header="Dark Card" footer={<Button variant="primary">Action</Button>}>
            <p>This is a dark themed card with a footer.</p>
          </Card>
          
          <Card header="Loading Card" loading>
            <p>This content won't show while loading.</p>
          </Card>
        </div>
      </section>

      {/* Form Section */}
      <section className="demo-section">
        <h2>Forms</h2>
        <Card header="Sample Form" padding="large">
          <Form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <Label htmlFor="name" required>Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                error={form.formState.errors.name?.message}
                {...form.register('name', { required: 'Name is required' })}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="email" required>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                error={form.formState.errors.email?.message}
                {...form.register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="password" required>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                showPasswordToggle
                error={form.formState.errors.password?.message}
                {...form.register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </div>
            
            <div className="form-actions">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </section>

      {/* Input Section */}
      <section className="demo-section">
        <h2>Inputs</h2>
        <div className="demo-grid">
          <Input label="Text Input" placeholder="Enter text" />
          <Input label="Email Input" type="email" placeholder="Enter email" />
          <Input label="Password Input" type="password" placeholder="Enter password" showPasswordToggle />
          <Input label="Input with Error" error="This field has an error" />
          <Input label="Disabled Input" disabled placeholder="This is disabled" />
          <Input label="Required Input" required placeholder="This is required" />
        </div>
      </section>

      {/* Spinner Section */}
      <section className="demo-section">
        <h2>Spinners</h2>
        <div className="demo-grid">
          <div className="spinner-demo">
            <Spinner size="small" />
            <span>Small</span>
          </div>
          <div className="spinner-demo">
            <Spinner size="medium" />
            <span>Medium</span>
          </div>
          <div className="spinner-demo">
            <Spinner size="large" />
            <span>Large</span>
          </div>
        </div>
        
        <div className="demo-grid">
          <div className="spinner-demo">
            <Spinner size="medium" variant="primary" />
            <span>Primary</span>
          </div>
          <div className="spinner-demo">
            <Spinner size="medium" variant="secondary" />
            <span>Secondary</span>
          </div>
          <div className="spinner-demo">
            <Spinner size="medium" variant="white" />
            <span>White</span>
          </div>
        </div>
      </section>

      {/* Modal Section */}
      <section className="demo-section">
        <h2>Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Sample Modal"
          size="medium"
        >
          <p>This is a sample modal with form content.</p>
          <p>You can put any content here.</p>
          
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </Modal>
      </section>

      {/* Notification Section */}
      <section className="demo-section">
        <h2>Notification System</h2>
        <div className="demo-grid">
          <Button onClick={() => addNotification('This is an info notification!', 'info')}>
            Info Notification
          </Button>
          <Button onClick={() => addNotification('This is a success notification!', 'success')}>
            Success Notification
          </Button>
          <Button onClick={() => addNotification('This is a warning notification!', 'warning')}>
            Warning Notification
          </Button>
          <Button onClick={() => addNotification('This is an error notification!', 'error')}>
            Error Notification
          </Button>
        </div>
        <div className="demo-grid">
          <Button onClick={() => {
            addNotification('Multiple notifications demo!', 'info');
            setTimeout(() => addNotification('Second notification!', 'success'), 500);
            setTimeout(() => addNotification('Third notification!', 'warning'), 1000);
          }}>
            Show Multiple Notifications
          </Button>
        </div>
      </section>

      {/* Toast Section */}
      <section className="demo-section">
        <h2>Toast Notifications</h2>
        <div className="demo-grid">
          <Button onClick={handleToastDemo}>Show All Toast Types</Button>
          <Button onClick={() => showToast.success('Custom success message!')}>
            Success Toast
          </Button>
          <Button onClick={() => showToast.error('Custom error message!')}>
            Error Toast
          </Button>
          <Button onClick={() => showToast.warning('Custom warning message!')}>
            Warning Toast
          </Button>
          <Button onClick={() => showToast.info('Custom info message!')}>
            Info Toast
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ComponentDemo; 