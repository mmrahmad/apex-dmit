import React from "react";

// =====> Types & Interfaces <===== //
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// =======> Main Function <======= //
const Button: React.FC<Props> = ({ type = "button", children, ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-lg bg-primary p-4 py-2 text-white transition-all duration-150 hover:bg-primary-dark ${props?.className ? props?.className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
