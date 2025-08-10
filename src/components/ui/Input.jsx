import React, { forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  disabled = false,
  required = false,
  className = '',
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const inputClasses = [
    'input-field',
    error && 'input-error',
    disabled && 'input-disabled',
    isFocused && 'input-focused',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    error && 'input-container-error',
    disabled && 'input-container-disabled'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {error && (
          <div className="input-error-icon">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      
      {error && (
        <p className="input-error-message">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
