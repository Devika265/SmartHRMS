import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDesignations, deleteDesignation } from "../../services/designationService";
import { Plus, Search } from "lucide-react";
import DesignationModal from "../../components/designations/DesignationModal";
import DesignationTable from "../../components/designations/DesignationTable";
import { toast } from "react-hot-toast";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [search, setSearch] = useState("");

  const handleEdit = (designation) => {
    setSelectedDesignation(designation);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this designation?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDesignation(id);
      toast.success("Designation deleted successfully");
      fetchDesignations();
    } catch (error) {
      console.error("Error deleting designation:", error);
      toast.error(error.response?.data?.detail || "Failed to delete designation");
    }
  };

  const fetchDesignations = async (searchText = "") => {
    try {
      const data = await getDesignations(searchText);
      setDesignations(data.results || data || []);
    } catch (error) {
      console.error("Error fetching designations:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch designations");
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Designations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all designations in your organization
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              fetchDesignations(value);
            }}
            placeholder="Search Designation..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Designation
        </button>
      </div>

      <DesignationTable
        designations={designations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {openModal && (
        <DesignationModal
          onClose={() => {
            setOpenModal(false);
            setSelectedDesignation(null);
          }}
          fetchDesignations={fetchDesignations}
          designation={selectedDesignation}
        />
      )}
    </div>
  );
};

export default Designations;
