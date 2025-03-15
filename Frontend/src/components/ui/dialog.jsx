// components/ui/dialog.jsx
import React, { Fragment } from 'react';
import { X } from 'lucide-react';

export const Dialog = ({
  open = false,
  onOpenChange,
  children,
  title,
  description,
  className = ''
}) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange?.(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}>
        {/* Close Button */}
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Dialog Header */}
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-2 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Dialog Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

// Example usage of DialogContent, DialogHeader, DialogFooter components
export const DialogContent = ({ children, className = '' }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className = '' }) => (
  <div className={`space-y-1.5 ${className}`}>
    {children}
  </div>
);

export const DialogFooter = ({ children, className = '' }) => (
  <div className={`mt-6 flex justify-end space-x-4 ${className}`}>
    {children}
  </div>
);

// Optional: Export all dialog-related components together
export const DialogComponents = {
  Root: Dialog,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
};