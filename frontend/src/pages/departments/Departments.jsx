import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDepartments } from "../../services/departmentService";
import { Search, Plus } from "lucide-react";
import DepartmentModal from "../../components/departments/DepartmentModal";
import DepartmentTable from "../../components/departments/DepartmentTable";
import { deleteDepartment } from "../../services/departmentService";
import { toast } from "react-hot-toast";
import { toggleDepartmentStatus } from "../../services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [search, setSearch] = useState("");

  const handleToggle = async (department) => {
    try {
      const updatedDepartment = {
        ...department,
        is_active: !department.is_active,
      };

      await toggleDepartmentStatus(department.id, updatedDepartment);
      toast.success("Department status updated successfully");
      fetchDepartments();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(error.response?.data?.detail || "Failed to update department status");
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);
      toast.success("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error(error.response?.data?.detail || "Failed to delete department");
    }
  };

  const fetchDepartments = async (searchText = "") => {
    try {
      const data = await getDepartments(searchText);
      setDepartments(data.results || data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Departments</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all departments in your organization
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              fetchDepartments(value);
            }}
            placeholder="Search Department..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {/* Modal */}
      {openModal && (
        <DepartmentModal
          onClose={() => {
            setOpenModal(false);
            setSelectedDepartment(null);
          }}
          fetchDepartments={fetchDepartments}
          department={selectedDepartment}
        />
      )}
    </div>
  );
};

export default Departments;
