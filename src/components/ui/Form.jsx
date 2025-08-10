import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './Form.css';

const Form = ({
  children,
  onSubmit,
  defaultValues = {},
  mode = 'onChange',
  className = '',
  ...props
}) => {
  const methods = useForm({
    defaultValues,
    mode,
    ...props
  });

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit(data, methods);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={`form ${className}`}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form; 