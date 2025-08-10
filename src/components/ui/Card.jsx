import React from 'react';
import Spinner from './Spinner';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  padding = 'default',
  className = '',
  header,
  footer,
  loading = false,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    className
  ].join(' ');

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="card-header">
          {typeof header === 'string' ? <h3 className="card-title">{header}</h3> : header}
        </div>
      )}
      
      <div className="card-body">
        {loading ? (
          <div className="card-loading">
            <Spinner size="medium" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
