import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 vintage-btn";
  
  const variantClasses = {
    primary: "bg-library-brown text-library-cream hover:bg-library-saddle focus:ring-library-wood",
    secondary: "bg-library-wood text-library-cream hover:bg-library-saddle focus:ring-library-wood",
    danger: "bg-library-burgundy text-library-cream hover:bg-red-800 focus:ring-library-burgundy",
    success: "bg-library-teal text-library-cream hover:opacity-90 focus:ring-library-teal",
    outline: "bg-transparent text-library-brown border-2 border-library-wood hover:bg-library-parchment focus:ring-library-wood",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
