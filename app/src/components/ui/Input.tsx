import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  id,
  ...props
}) => {
  const inputId = id || Math.random().toString(36).substr(2, 9);

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-content-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-3 py-2 bg-background-tertiary border border-background-gray rounded-lg text-content-primary placeholder-content-secondary focus:outline-none focus:ring-2 focus:ring-content-brand focus:border-transparent transition-all duration-200',
          error && 'border-accent-red focus:ring-accent-red',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-accent-red">{error}</p>
      )}
    </div>
  );
};