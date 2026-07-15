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
                'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200',
                isSelected
                  ? 'border-content-brand bg-content-brand/10'
                  : 'border-background-tertiary hover:bg-background-tertiary/60'
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
                'shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                isSelected
                  ? 'border-content-brand'
                  : 'border-background-gray'
              )}>
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-content-brand" />
                )}
              </div>

              <div className="flex flex-col">
                <span className={cn(
                  'font-semibold text-sm leading-tight transition-colors duration-200',
                  isSelected ? 'text-content-brand' : 'text-content-primary'
                )}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-content-secondary mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
