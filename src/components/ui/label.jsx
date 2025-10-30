import React from "react";

export const Label = ({ className = "", children, htmlFor, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
};