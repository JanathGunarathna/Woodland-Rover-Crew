import * as React from "react";
import { X } from "lucide-react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const alertStyles = {
      default: "bg-background text-foreground",
      success: "bg-green-500/10 text-green-500",
      error: "bg-red-500/10 text-red-500",
    }[variant];

    return (
      <div
        ref={ref}
        className={`rounded-md border px-4 py-3 ${alertStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h5
      ref={ref}
      className={`mb-1 font-medium ${className}`}
      {...props}
    />
  )
);

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    />
  )
);

const AlertDialog = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${className}`}
      {...props}
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
          {children}
        </div>
      </div>
    </div>
  )
);

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

export { Alert, AlertTitle, AlertDescription, AlertDialog, AlertDialogAction };
