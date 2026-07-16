import React from "react";
import { Pencil, Trash2, Power } from "lucide-react";

const DepartmentTable = ({ departments, onEdit, onDelete, onToggle }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Department Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Code
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Description
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              className="border-b border-gray-200 hover:bg-orange-50 transition"
            >
              {/* Department Name */}
              <td className="px-6 py-3">{department.name}</td>

              <td className="px-6 py-3">{department.code}</td>

              <td className="max-w-xs truncate px-6 py-3">
                {department.description || "-"}
              </td>

              {/* Status */}
              <td className="px-6 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    department.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {department.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* Action */}
              <td className="px-6 py-3">
                <div className="flex items-center justify-center gap-4">
                  <button onClick={() => onEdit(department)}
                    className="rounded-md p-2 text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button onClick={() => onDelete(department.id)}
                    className="rounded-md p-2 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 size={18}  />
                  </button>

                  <button onClick={() => onToggle(department)}
                    className={`rounded-md p-2 ${
                      department.is_active
                        ? "text-green-600 hover:bg-green-100"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    title={department.is_active ? "Deactivate" : "Activate"}
                  >
                    <Power size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
