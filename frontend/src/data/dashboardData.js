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


