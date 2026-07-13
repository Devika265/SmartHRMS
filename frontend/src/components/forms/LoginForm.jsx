import React, { useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const form = useForm();
  // const register = form.register;
  // const handleSubmit = form.handleSubmit;
  // const errors = form.formState.errors;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        register={(name) => register(name, { 
          required: "Email is required",
          pattern: {
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:"Please enter a valid email",
          }
        })}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        register={(name) =>
          register(name, { 
            required: "password is required" ,
            minLength:{
              value:6,
              message:"Password must be at least 6 characters",
            },
          })
        }
        error={errors.password?.message}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
