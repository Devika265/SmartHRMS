import React from "react";
import { Pencil, Trash2, Power } from "lucide-react";

const EmployeeTable = ({ employees, onEdit, onDelete, onToggle }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[25%] px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Employee
            </th>

            <th className="w-[25%] px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>

            <th className="w-[15%] px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Department
            </th>

            <th className="w-[20%] px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Designation
            </th>

            <th className="w-[10%] px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>

            <th className="w-[15%] px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-gray-200 transition hover:bg-emerald-50"
              >
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                      {employee.first_name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {employee.first_name} {employee.last_name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {employee.email}
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {employee.department}
                </td>

                {/* Designation */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {employee.designation}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      employee.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="rounded-md p-2 text-blue-600 transition hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(employee.id)}
                      className="rounded-md p-2 text-red-600 transition hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => onToggle(employee)}
                      className={`rounded-md p-2 transition ${
                        employee.is_active
                          ? "text-green-600 hover:bg-green-100"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      title={employee.is_active ? "Deactivate" : "Activate"}
                    >
                      <Power size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
