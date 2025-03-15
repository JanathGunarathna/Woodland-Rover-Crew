// components/ui/button.jsx
import React from 'react';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export const Button = React.forwardRef(({
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// import * as React from "react"

// const Button = React.forwardRef(({ className, ...props }, ref) => {
//   return (
//     <button
//       className={`
//         inline-flex items-center justify-center rounded-md text-sm font-medium
//         ring-offset-white transition-colors focus-visible:outline-none 
//         focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 
//         disabled:pointer-events-none disabled:opacity-50
//         bg-gray-900 text-gray-50 hover:bg-gray-900/90
//         h-10 px-4 py-2 ${className}`}
//       ref={ref}
//       {...props}
//     />
//   )
// })
// Button.displayName = "Button"
