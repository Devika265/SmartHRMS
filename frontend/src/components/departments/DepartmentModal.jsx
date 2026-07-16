import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  createDepartment,
  updateDepartment,
} from "../../services/departmentService";

const DepartmentModal = ({ onClose, fetchDepartments, department }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        code: department.code,
        description: department.description,
      });
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (department) {
        // Edit
        await updateDepartment(department.id, formData);
        toast.success("Department updated successfully")
      } else {
        // Add
        await createDepartment(formData);
        toast.success("Department created  successfully")
      }
      fetchDepartments();
      onClose();
    } catch (error) {
      console.error("Error submitting department:", error);
      toast.error(
        error.response?.data?.name?.[0] ||
        error.response?.data?.code?.[0] ||
        error.response?.data?.detail || 
        "An error occurred while saving the department"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {department ? "Edit Department" : "Add Department"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Department Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Department Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Department Name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Department Code
            </label>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter Department Code"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
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
              {department ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
