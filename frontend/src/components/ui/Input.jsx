import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => {


  const [showPassword, setShowPassword] =useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium ">{label}</label>
      <input
        type={type === "password" ? (showPassword ? "text" : "password"): type}

        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      />


    {type === "password" && (
      <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute left-233 bottom-65 -translate-y-1/2 text-gray-500">

        {showPassword ? <EyeOff size={18} /> : <Eye size={18}/>}

      </button>
    )

    }


    </div>
  );
};

export default Input;
