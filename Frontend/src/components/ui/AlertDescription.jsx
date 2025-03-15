import React from 'react';

const Alert = ({ children, className = '', ...props }) => {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Example usage of the components with different variants
const AlertDemo = () => {
  return (
    <div className="space-y-4">
      {/* Default Alert */}
      <Alert>
        <AlertDescription>
          A default alert message
        </AlertDescription>
      </Alert>

      {/* Success Alert */}
      <Alert className="border-green-200 bg-green-50">
        <AlertDescription className="text-green-800">
          Operation completed successfully!
        </AlertDescription>
      </Alert>

      {/* Error Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-800">
          An error occurred. Please try again.
        </AlertDescription>
      </Alert>

      {/* Warning Alert */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertDescription className="text-yellow-800">
          Please review the changes before continuing.
        </AlertDescription>
      </Alert>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800">
          New features are available.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export { Alert, AlertDescription, AlertDemo };