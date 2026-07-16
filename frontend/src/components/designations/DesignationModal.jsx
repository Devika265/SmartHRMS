import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  createDesignation,
  updateDesignation,
} from "../../services/designationService";

const DesignationModal = ({ onClose, fetchDesignations, designation }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (designation) {
      setFormData({
        name: designation.name,
      });
    }
  }, [designation]);

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
      if (designation) {
        await updateDesignation(designation.id, formData);
        toast.success("Designation updated successfully");
      } else {
        await createDesignation(formData);
        toast.success("Designation created successfully");
      }
      fetchDesignations();
      onClose();
    } catch (error) {
      console.error("Error saving designation:", error);
      toast.error(
        error.response?.data?.name?.[0] ||
        error.response?.data?.detail ||
        "Failed to save designation"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {designation ? "Edit Designation" : "Add Designation"}
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
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Designation Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Designation Name"
              required
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
              {designation ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignationModal;
