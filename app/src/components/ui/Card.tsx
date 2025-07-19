import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-background-secondary border border-background-tertiary',
    hover: 'bg-background-secondary border border-background-tertiary hover:bg-background-tertiary transition-all duration-200 cursor-pointer',
    glass: 'bg-background-secondary/50 backdrop-blur-sm border border-background-tertiary/50',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};