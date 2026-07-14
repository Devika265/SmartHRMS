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
    title: "Total Employees",
    value: 15,
    icon: Users,
  },
  {
    id: 2,
    title: "Active Employees",
    value: 4,
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Inactive Employees",
    value: 1,
    icon: UserX,
  },
  {
    id: 4,
    title: "Total Departments",
    value: 10,
    icon: Building2,
  },
  {
    id: 5,
    title: "Total Users",
    value: 33,
    icon: UserCog,
  },
  {
    id: 6,
    title: "Total Roles",
    value: 14,
    icon: ShieldCheck,
  },
];


export const departmentSummary = [
    {
        department:"IT",
        employee_count:32,
    },
    {
        department:"HR",
        employee_count:25,
    },
    {
        department:"Finance",
        employee_count:40,
    },

]