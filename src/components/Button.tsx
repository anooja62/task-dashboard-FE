import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
