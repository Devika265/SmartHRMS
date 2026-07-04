import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium ">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default Input;
