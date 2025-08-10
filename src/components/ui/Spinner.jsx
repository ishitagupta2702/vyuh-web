import React from 'react';
import { Loader2 } from 'lucide-react';
import './Spinner.css';

const Spinner = ({
  size = 'medium',
  variant = 'default',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const variantClasses = {
    default: 'spinner-default',
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    white: 'spinner-white'
  };

  const classes = [
    'spinner',
    sizeClasses[size],
    variantClasses[variant],
    className
  ].join(' ');

  return (
    <div className={classes} {...props}>
      <Loader2 className="spinner-icon" />
    </div>
  );
};

export default Spinner;