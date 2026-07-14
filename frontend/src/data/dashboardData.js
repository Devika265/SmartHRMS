import {
  Users,
  UserCheck,
  UserX,
  Building2,
  UserCog,
  ShieldCheck,
} from "lucide-react";

export const dashboardStates = [
  {
    id: 1,
    title: "Total Users",
    key: "total_users",
    icon: UserCog,
  },
  {
    id: 2,
    title: "Total Employees",
    key: "total_employees",
    icon: Users,
  },
  {
    id: 3,
    title: "Total Departments",
    key: "total_departments",
    icon: Building2,
  },
  {
    id: 4,
    title: "Active Employees",
    key: "active_employees",
    icon: UserCheck,
  },
  {
    id: 5,
    title: "Inactive Employees",
    key: "inactive_employees",
    icon: UserX,
  },
];

export const departmentSummary = [
  {
    department: "IT",
    employee_count: 32,
  },
  {
    department: "HR",
    employee_count: 25,
  },
  {
    department: "Finance",
    employee_count: 40,
  },
];

export const recentEmployees = [
  {
    id: 1,
    name: "Devika A",
    designation: "Software Engineer",
    department: "IT",
    is_active: true,
  },
  {
    id: 2,
    name: "Monisha M",
    designation: "Manager",
    department: "HR",
    is_active: true,
  },
  {
    id: 3,
    name: "Anu S",
    designation: "Marketing",
    department: "Finance",
    is_active: false,
  },
  {
    id: 4,
    name: "Vasu K",
    designation: "UI UX Designer",
    department: "HR",
    is_active: true,
  },
  {
    id: 5,
    name: "Santhiya K",
    designation: "Tester",
    department: "IT",
    is_active: true,
  },
];
