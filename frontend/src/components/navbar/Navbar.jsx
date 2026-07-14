import React from "react";
import { Bell, ChevronDown, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const pageTitle = location.pathname
    .replace("/", "")
    .replace("-"," ");

  const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  console.log(pageTitle)

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-orange-500 bg-white px-6">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-slate-600" size={22} />

        <div className="flex cursor-pointer items-center gap-2">
          <UserCircle2 size={34} className="text-orange-500" />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">Admin</span>
            <span className="text-xs text-slate-500 ">Administrator</span>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
