import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Plus, Search } from "lucide-react";
import PayrollModal from "../../components/payroll/PayrollModal";
import PayrollTable from "../../components/payroll/PayrollTable";
import { getPayrolls, deletePayroll } from "../../services/payrollService";
import { toast } from "react-hot-toast";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPayrolls = async (searchText = "") => {
    try {
      const data = await getPayrolls(searchText);
      setPayrolls(data.results || data || []);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch payroll records");
    }
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payroll record?"
    );

    if (!confirmDelete) return;

    try {
      await deletePayroll(id);
      toast.success("Payroll deleted successfully");
      fetchPayrolls();
    } catch (error) {
      console.error("Error deleting payroll:", error);
      toast.error(error.response?.data?.detail || "Failed to delete payroll record");
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee salaries and records
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
              fetchPayrolls(value);
            }}
            placeholder="Search Payroll..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => {
            setSelectedPayroll(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Payroll
        </button>
      </div>

      <PayrollTable
        payrolls={payrolls}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {openModal && (
        <PayrollModal
          payroll={selectedPayroll}
          fetchPayrolls={fetchPayrolls}
          onClose={() => {
            setOpenModal(false);
            setSelectedPayroll(null);
          }}
        />
      )}
    </div>
  );
};

export default Payroll;
