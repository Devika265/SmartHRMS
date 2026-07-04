import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { login } from "../../services/authService";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!formData.email) {
    alert("Email is required");
    return;
  }

  if (!formData.password) {
    alert("Password is required");
    return;
  }

  try {
    const response = await login(formData);
    console.log(response);
  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

      <p className="text-center text-gray-500 mb-6">Sign in to continue</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default LoginForm;
