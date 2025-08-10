import React from 'react';
import './Label.css';

const Label = ({
  children,
  htmlFor,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const labelClasses = [
    'label',
    disabled && 'label-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <label
      htmlFor={htmlFor}
      className={labelClasses}
      {...props}
    >
      {children}
      {required && <span className="label-required">*</span>}
    </label>
  );
};

export default Label;
