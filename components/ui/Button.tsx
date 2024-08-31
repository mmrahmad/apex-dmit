import React from "react";

// =====> Types & Interfaces <===== //
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

// =======> Main Function <======= //
const Button: React.FC<Props> = ({
  type = "button",
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`rounded-lg p-4 py-2 text-white transition-all duration-150 ${isLoading ? "bg-gray-300 text-gray-600" : "bg-primary hover:bg-primary-dark"} ${props?.className ? props?.className : ""}`}
    >
      {isLoading && (
        <div
          className="text-surface mr-3 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
