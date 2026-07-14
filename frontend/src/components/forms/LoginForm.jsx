import React, { useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setLoginError("");

      const response = await loginUser(data);

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Login Successful");

      navigate("/dashboard");

      console.log("Login success:", response);
    } catch (error) {
      setLoginError(error.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        register={(name) =>
          register(name, {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })
        }
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        register={(name) =>
          register(name, {
            required: "password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })
        }
        error={errors.password?.message}
      />

      {loginError && (
        <div className="rounded-md bg-red-100 border border-red-300 p-3 text-sm text-red-700">
          {loginError}
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      
    </form>
  );
};

export default LoginForm;
