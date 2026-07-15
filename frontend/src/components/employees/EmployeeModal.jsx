import React, { useState } from "react";
import { X } from "lucide-react";
import { createEmployee } from "../../services/employeeService";

const EmployeeModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    designation: "",
    salary: "",
    joining_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await createEmployee(formData);
      console.log(response);
    } catch(error){
      console.log(error);
    }

  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">
          <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              >
                <option value="">Select Department</option>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter Designation"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Joining Date
              </label>

              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-2 mt-2 flex justify-end gap-3 border-t pt-5">
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
