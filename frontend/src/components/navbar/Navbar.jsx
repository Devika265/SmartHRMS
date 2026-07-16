import React from "react";
import { Bell, UserCircle2 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const pageTitle = location.pathname
    .replace("/", "")
    .replace("-", " ");

  const title = pageTitle ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) : "Dashboard";

  // Get user details from localStorage (if stored on login)
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const username = user?.username || "Admin";
  const roleName = user?.role || "Administrator";

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-emerald-600 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-slate-600" size={22} />

        <Link
          to="/profile"
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition hover:bg-gray-50"
        >
          <UserCircle2 size={34} className="text-emerald-600" />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">{username}</span>
            <span className="text-xs text-slate-500">{roleName}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
