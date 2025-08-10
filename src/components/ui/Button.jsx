import React from 'react';
import Spinner from './Spinner';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    success: 'btn-success'
  };
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  };
  const stateClasses = [
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    fullWidth && 'btn-full-width'
  ].filter(Boolean);

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    ...stateClasses,
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Spinner size="small" variant="white" className="btn-spinner" />}
      {children}
    </button>
  );
};

export default Button;
