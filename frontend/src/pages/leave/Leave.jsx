import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Plus, Search } from "lucide-react";
import LeaveModal from "../../components/leave/LeaveModal";
import LeaveTable from "../../components/leave/LeaveTable";
import { getLeaves, deleteLeave } from "../../services/leaveService";
import { toast } from "react-hot-toast";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [search, setSearch] = useState("");

  const fetchLeaves = async (searchText = "") => {
    try {
      const data = await getLeaves(searchText);
      setLeaves(data.results || data || []);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch leave records");
    }
  };

  const handleEdit = (leave) => {
    setSelectedLeave(leave);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLeave(id);
      toast.success("Leave deleted successfully");
      fetchLeaves();
    } catch (error) {
      console.error("Error deleting leave:", error);
      toast.error(error.response?.data?.detail || "Failed to delete leave record");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee leaves
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
              fetchLeaves(value);
            }}
            placeholder="Search Leave..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => {
            setSelectedLeave(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Leave
        </button>
      </div>

      <LeaveTable
        leaves={leaves}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {openModal && (
        <LeaveModal
          leave={selectedLeave}
          fetchLeaves={fetchLeaves}
          onClose={() => {
            setOpenModal(false);
            setSelectedLeave(null);
          }}
        />
      )}
    </div>
  );
};

export default Leave;
