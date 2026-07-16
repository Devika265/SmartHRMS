import React from "react";
import { sidebarMenu } from "../../data/sidebarMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../services/authService";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser({ refresh: refreshToken });
      }
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-fold text-orange-500">HRMS</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${isActive ? "bg-orange-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-400 transition-colors hover:bg-slate-800 hover:text-red-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
