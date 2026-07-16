import {
    LayoutDashboard,
    Users,
    Building2,
    Briefcase,
    CalendarDays,
    FileText,
    Wallet,
    Settings,
    ShieldCheck,
    
} from "lucide-react"

export const sidebarMenu = [
    {
        id:1,
        title:"Dashboard",
        path:"/dashboard",
        icon:LayoutDashboard,
    },
    {
        id:2,
        title:"Employees",
        path:"/employees",
        icon:Users,
    },
    {
        id:3,
        title:"Departments",
        path:"/departments",
        icon:Building2,
    },
    {
        id:4,
        title:"Designations",
        path:"/designations",
        icon:Briefcase,
    },
    {
        id:5,
        title:"Attendance",
        path:"/attendance",
        icon:CalendarDays,
    },
    {
        id:6,
        title:"Leave",
        path:"/leave",
        icon:FileText,
    },
    {
        id:7,
        title:"Payroll",
        path:"/payroll",
        icon:Wallet,
    },
]