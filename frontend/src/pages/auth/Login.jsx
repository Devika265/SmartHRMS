import React from "react";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-xl">

        <div className="mb-8 text-center">
          
          <h1 className="text-3xl font-bold text-slate-800">HRMS</h1>

          <p className="mt-2 text-sm text-slate-500">
            Human Resource Management System
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-slate-700">
            Welcome Back !
          </h2>

          <p className="mt-2 text-sm text-slate-500">Sign in to continue</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
