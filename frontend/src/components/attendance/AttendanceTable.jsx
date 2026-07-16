import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const AttendanceTable = ({ attendances, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Employee
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Check In
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Check Out
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
          {attendances.length > 0 ? (
            attendances.map((attendance) => (
              <tr
                key={attendance.id}
                className="border-b border-gray-200 transition hover:bg-orange-50"
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {typeof attendance.employee === 'object' ? `${attendance.employee.first_name} ${attendance.employee.last_name}` : attendance.employee_name || attendance.employee}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {attendance.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {attendance.check_in || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {attendance.check_out || "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      attendance.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : attendance.status === "Absent"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {attendance.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(attendance)}
                      className="rounded-md p-2 text-blue-600 transition hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(attendance.id)}
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
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
