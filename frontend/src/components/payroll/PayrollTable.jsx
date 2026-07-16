import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const PayrollTable = ({ payrolls, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Month / Year</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Basic Salary</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Allowances</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deductions</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Net Salary</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.length > 0 ? (
            payrolls.map((payroll) => (
              <tr key={payroll.id} className="border-b border-gray-200 transition hover:bg-emerald-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {typeof payroll.employee === 'object' ? `${payroll.employee.first_name} ${payroll.employee.last_name}` : payroll.employee_name || payroll.employee}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{payroll.month} {payroll.year}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${parseFloat(payroll.basic_salary).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${parseFloat(payroll.allowances).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${parseFloat(payroll.deductions).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">${parseFloat(payroll.net_salary).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(payroll)}
                      className="rounded-md p-2 text-blue-600 transition hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(payroll.id)}
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
                No payroll records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
