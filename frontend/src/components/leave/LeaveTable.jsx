import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const LeaveTable = ({ leaves, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Start Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">End Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reason</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.id} className="border-b border-gray-200 transition hover:bg-emerald-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {typeof leave.employee === 'object' ? `${leave.employee.first_name} ${leave.employee.last_name}` : leave.employee_name || leave.employee}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{leave.leave_type}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{leave.start_date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{leave.end_date}</td>
                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-[200px]">{leave.reason}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(leave)}
                      className="rounded-md p-2 text-blue-600 transition hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(leave.id)}
                      className="rounded-md p-2 text-red-600 transition hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                No leave records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
