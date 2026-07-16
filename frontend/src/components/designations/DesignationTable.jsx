import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const DesignationTable = ({ designations, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Designation Name
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-32">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {designations.map((designation) => (
            <tr
              key={designation.id}
              className="border-b border-gray-200 hover:bg-orange-50 transition"
            >
              <td className="px-6 py-3">{designation.name}</td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => onEdit(designation)}
                    className="rounded-md p-2 text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(designation.id)}
                    className="rounded-md p-2 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {designations.length === 0 && (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                No designations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DesignationTable;
