import React from "react";

const RecentEmployees = ({employees}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full">
      <h2 className="mb-6 text-lg font-semibold">
        Recent Employees
      </h2>

      <div className="h-87.5 overflow-y-auto pr-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
          className="flex items-center justify-between border-b border-slate-200 py-4 last:border-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                {employee.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">{employee.name}</h3>

                <p className="text-sm text-gray-500">
                  {employee.designation}
                </p>

                <p className="text-xs text-gray-400">
                  {employee.department}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                employee.is_active
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {employee.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEmployees;