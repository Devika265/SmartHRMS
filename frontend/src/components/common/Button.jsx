import React from 'react'

const Button = ({
    type="button",
    children,
    onClick,
    disabled = false,
    className = "",
}) => {
  return (
    <button
      type = {type}
      onClick = {onClick}
      disabled = {disabled}
      className={`w-full rounded-lg px-4 py-2 font-medium text-white bg-rose-600 hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    
    >

        {children}
    </button>
  )
}

export default Button

