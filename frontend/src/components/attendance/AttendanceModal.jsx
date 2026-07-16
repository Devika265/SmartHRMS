import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createAttendance, updateAttendance } from "../../services/attendanceService";
import { getEmployees } from "../../services/employeeService";
import { toast } from "react-hot-toast";

const AttendanceModal = ({ onClose, fetchAttendances, attendance }) => {
  const [formData, setFormData] = useState({
    employee: "",
    date: new Date().toISOString().split("T")[0],
    check_in: "",
    check_out: "",
    status: "Present",
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
    if (attendance) {
      setFormData({
        employee: typeof attendance.employee === 'object' ? attendance.employee.id : attendance.employee,
        date: attendance.date,
        check_in: attendance.check_in || "",
        check_out: attendance.check_out || "",
        status: attendance.status,
      });
    }
  }, [attendance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert empty strings to null for time fields if needed by backend, though empty string usually works or is ignored
    const payload = {
        ...formData,
        check_out: formData.check_out || null
    };
    
    if(!payload.check_in) {
        delete payload.check_in; // let default take over if not provided
    }

    try {
      if (attendance) {
        await updateAttendance(attendance.id, payload);
        toast.success("Attendance updated successfully");
      } else {
        await createAttendance(payload);
        toast.success("Attendance created successfully");
      }
      fetchAttendances();
      onClose();
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error(
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail || 
        "Failed to save attendance"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex w-full max-w-md flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {attendance ? "Edit Attendance" : "Add Attendance"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Employee */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Check In */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Check In Time
              </label>
              <input
                type="time"
                step="1"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Check Out */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Check Out Time
              </label>
              <input
                type="time"
                step="1"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            {/* Buttons */}
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
                className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                {attendance ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
