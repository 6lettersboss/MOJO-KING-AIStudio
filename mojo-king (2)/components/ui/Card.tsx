
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  const paddingClass = noPadding ? '' : 'p-6 sm:p-8';
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-200/50 w-full ${paddingClass} ${className}`}
    >
      {children}
    </div>
  );
};
