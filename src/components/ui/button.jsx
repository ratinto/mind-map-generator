import React from "react";

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

export const Button = React.forwardRef(({ className = "", variant, children, ...props }, ref) => {
  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      ref={ref}
      className={`${base} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";