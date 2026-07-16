import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "w-full rounded-lg px-4 py-2 font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",

    secondary: "bg-slate-600 text-white hover:bg-slate-700",

    danger: "bg-red-500 text-white hover:bg-red-600",

    outline: "border border-slate-300 text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >

        {children}
    </button>
  );
};

export default Button;
