import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  register,
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        
        className={`w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-orange-500 ${className}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
