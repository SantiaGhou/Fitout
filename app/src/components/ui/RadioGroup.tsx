import React from 'react';
import { cn } from '../../utils/cn';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-content-secondary">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-3 p-3 rounded-lg border border-background-tertiary hover:bg-background-tertiary cursor-pointer transition-all duration-200"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 h-4 w-4 text-content-brand focus:ring-content-brand border-background-gray"
            />
            <div className="flex-1">
              <div className="text-content-primary font-medium">{option.label}</div>
              {option.description && (
                <div className="text-sm text-content-secondary">{option.description}</div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};