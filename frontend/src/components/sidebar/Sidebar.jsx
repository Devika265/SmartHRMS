import React from "react";
import { sidebarMenu } from "../../data/sidebarMenu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
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
    </aside>
  );
};

export default Sidebar;
