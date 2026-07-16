import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createLeave, updateLeave } from "../../services/leaveService";
import { getEmployees } from "../../services/employeeService";
import { toast } from "react-hot-toast";

const LeaveModal = ({ onClose, fetchLeaves, leave }) => {
  const [formData, setFormData] = useState({
    employee: "",
    leave_type: "Sick",
    start_date: "",
    end_date: "",
    reason: "",
    status: "Pending",
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
    if (leave) {
      setFormData({
        employee: typeof leave.employee === 'object' ? leave.employee.id : leave.employee,
        leave_type: leave.leave_type,
        start_date: leave.start_date,
        end_date: leave.end_date,
        reason: leave.reason,
        status: leave.status,
      });
    }
  }, [leave]);

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
      if (leave) {
        await updateLeave(leave.id, formData);
        toast.success("Leave updated successfully");
      } else {
        await createLeave(formData);
        toast.success("Leave created successfully");
      }
      fetchLeaves();
      onClose();
    } catch (error) {
      console.error("Error saving leave:", error);
      toast.error(
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail || 
        "Failed to save leave record"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            {leave ? "Edit Leave" : "Add Leave"}
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

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Leave Type</label>
              <select
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              >
                <option value="Sick">Sick</option>
                <option value="Casual">Casual</option>
                <option value="Earned">Earned</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter reason..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              ></textarea>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
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
                {leave ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
