import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Plus, Search } from "lucide-react";
import AttendanceModal from "../../components/attendance/AttendanceModal";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import { getAttendances, deleteAttendance } from "../../services/attendanceService";
import { toast } from "react-hot-toast";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [search, setSearch] = useState("");

  const fetchAttendances = async (searchText = "") => {
    try {
      const data = await getAttendances(searchText);
      setAttendances(data.results || data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch attendance records");
    }
  };

  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);
      toast.success("Attendance deleted successfully");
      fetchAttendances();
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast.error(error.response?.data?.detail || "Failed to delete attendance record");
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee attendance records
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              fetchAttendances(value);
            }}
            placeholder="Search Attendance..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => {
            setSelectedAttendance(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Attendance
        </button>
      </div>

      {/* Table */}
      <AttendanceTable
        attendances={attendances}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {openModal && (
        <AttendanceModal
          attendance={selectedAttendance}
          fetchAttendances={fetchAttendances}
          onClose={() => {
            setOpenModal(false);
            setSelectedAttendance(null);
          }}
        />
      )}
    </div>
  );
};

export default Attendance;
