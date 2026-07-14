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
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200',
                isSelected
                  ? 'border-content-brand bg-content-brand/10'
                  : 'border-background-tertiary hover:bg-background-tertiary'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />

              {/* Radio circle customizado */}
              <div className={cn(
                'mt-0.5 flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                isSelected ? 'border-content-brand' : 'border-background-gray'
              )}>
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-content-brand" />
                )}
              </div>

              <div className="flex-1">
                <div className={cn(
                  'font-medium transition-colors duration-200',
                  isSelected ? 'text-content-brand' : 'text-content-primary'
                )}>
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-content-secondary">{option.description}</div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
