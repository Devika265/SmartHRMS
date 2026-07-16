import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createEmployee, updateEmployee } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { getDesignations } from "../../services/designationService";
import { toast } from "react-hot-toast";

const EmployeeModal = ({ onClose, fetchEmployees, employee }) => {
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

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const deptData = await getDepartments();
        const desigData = await getDesignations();
        setDepartments(deptData.results || deptData);
        setDesignations(desigData.results || desigData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (employee) {
      // Handle the case where employee.department/designation might be object/name or ID
      // If it's a string name, we need to map it to the ID based on options fetched,
      // but hopefully the employee object from the list has department/designation as strings 
      // and we might need to find the corresponding ID. Let's assume for now the API returns
      // something we can map or the user has to re-select it if it doesn't match perfectly.
      // A robust approach is to find the ID by name from our fetched options if it's a name.
      setFormData({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        email: employee.email || "",
        phone_number: employee.phone_number || "",
        department: employee.department?.id || employee.department || "", 
        designation: employee.designation?.id || employee.designation || "",
        salary: employee.salary || "",
        joining_date: employee.joining_date || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map department and designation names to IDs if they are currently names
    let deptId = formData.department;
    let desigId = formData.designation;

    if (isNaN(deptId)) {
        const foundDept = departments.find(d => d.name === deptId);
        if (foundDept) deptId = foundDept.id;
    }
    if (isNaN(desigId)) {
        const foundDesig = designations.find(d => d.name === desigId);
        if (foundDesig) desigId = foundDesig.id;
    }

    const payload = {
        ...formData,
        department: deptId,
        designation: desigId
    };

    try {
      if (employee) {
        await updateEmployee(employee.id, payload);
        toast.success("Employee updated successfully");
      } else {
        await createEmployee(payload);
        toast.success("Employee created successfully");
      }
      fetchEmployees();
      onClose();
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error(
        error.response?.data?.email?.[0] || 
        error.response?.data?.detail || 
        "Failed to save employee"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

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
                required
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
                required
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
                required
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
                required
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
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id || dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              >
                <option value="">Select Designation</option>
                {designations.map((desig) => (
                  <option key={desig.id} value={desig.id || desig.name}>
                    {desig.name}
                  </option>
                ))}
              </select>
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
                required
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
                required
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
                {employee ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
