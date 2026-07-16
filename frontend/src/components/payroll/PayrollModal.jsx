import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPayroll, updatePayroll } from "../../services/payrollService";
import { getEmployees } from "../../services/employeeService";
import { toast } from "react-hot-toast";

const PayrollModal = ({ onClose, fetchPayrolls, payroll }) => {
  const [formData, setFormData] = useState({
    employee: "",
    month: "January",
    year: new Date().getFullYear(),
    basic_salary: 0,
    allowances: 0,
    deductions: 0,
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmps = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data.results || data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmps();
  }, []);

  useEffect(() => {
    if (payroll) {
      setFormData({
        employee: typeof payroll.employee === 'object' ? payroll.employee.id : payroll.employee,
        month: payroll.month,
        year: payroll.year,
        basic_salary: payroll.basic_salary,
        allowances: payroll.allowances,
        deductions: payroll.deductions,
      });
    }
  }, [payroll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (payroll) {
        await updatePayroll(payroll.id, formData);
        toast.success("Payroll updated successfully");
      } else {
        await createPayroll(formData);
        toast.success("Payroll created successfully");
      }
      fetchPayrolls();
      onClose();
    } catch (error) {
      console.error("Error saving payroll:", error);
      toast.error(
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail || 
        "Failed to save payroll record"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            {payroll ? "Edit Payroll" : "Add Payroll"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={22} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Employee</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Basic Salary</label>
              <input
                type="number"
                step="0.01"
                name="basic_salary"
                value={formData.basic_salary}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Allowances</label>
              <input
                type="number"
                step="0.01"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Deductions</label>
              <input
                type="number"
                step="0.01"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
              >
                {payroll ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayrollModal;
