
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-bold py-3 px-6 rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const widthClass = fullWidth ? 'w-full' : '';

  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 disabled:bg-orange-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-orange-500',
  };

  return (
    <button
      className={`${baseClasses} ${widthClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
