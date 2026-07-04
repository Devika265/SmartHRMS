import React from 'react'

const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
    className="",
}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary-hover disabled:opacity-50 ${className}`}
    
    >
      {children}
    </button>
  )
}

export default Button;
