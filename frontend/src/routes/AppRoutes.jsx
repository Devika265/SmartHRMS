import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/not-found/NotFound";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Employees from "../pages/employees/Employees";
import Departments from "../pages/departments/Departments";
import Designations from "../pages/designations/Designations";
import Attendance from "../pages/attendance/Attendance";
import Leave from "../pages/leave/Leave";
import Payroll from "../pages/payroll/Payroll";
import Profile from "../pages/profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />}/>
          <Route path="/departments" element={<Departments />}/>
          <Route path="/designations" element={<Designations />}/>
          <Route path="/attendance" element={<Attendance />}/>
          <Route path="/leave" element={<Leave />}/>
          <Route path="/payroll" element={<Payroll />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;


