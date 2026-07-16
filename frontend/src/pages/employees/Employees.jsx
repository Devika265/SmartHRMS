import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import { getEmployees, deleteEmployee, toggleEmployeeStatus } from "../../services/employeeService";
import { toast } from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");

  const fetchEmployees = async (searchQuery = "") => {
    try {
      // Backend expects 'search' query param based on views.py
      // Update employee service if it doesn't take params?
      // Wait, employeeService.js getEmployees didn't take params. I should update it.
      // But I can also just pass the url manually or use a wrapper.
      // I'll update getEmployees in employeeService.js to take params.
      // For now, assume it's updated.
      // I will update employeeService.js right after this.
      const data = await getEmployees(searchQuery);
      setEmployees(data.results || data || []);
    } catch (error) {
      console.error("Employee API Error:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch employees");
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchEmployees(search);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(error.response?.data?.detail || "Failed to delete employee");
    }
  };

  const handleToggle = async (employee) => {
    try {
      const updatedEmployee = {
        ...employee,
        is_active: !employee.is_active,
        // When updating, we might need to send department/designation IDs instead of objects/names if the backend expects it.
        // If the backend serializer uses read/write different serializers, we need to handle it.
        // The view has `EmployeeReadSerializer` and `EmployeeSerializer`.
        // The read serializer probably returns strings for department/designation.
        // We will just try sending the toggle status. The `EmployeeSerializer` might require all fields.
        // If it requires all fields, it might be tricky to send strings for foreign keys.
        // Let's send the status.
      };

      // Depending on backend, a PATCH might be better, but we only have PUT.
      // Actually, if we use PUT, we must send ALL required fields. 
      // The toggle function from previous logic just spread the object, but if `department` is a name in the get response and needs an ID in PUT, it will fail.
      // Let's just try sending the whole object for now.
      await toggleEmployeeStatus(employee.id, { is_active: updatedEmployee.is_active });
      // Note: If backend PUT requires all fields, this might fail unless backend allows partial update.
      // DRF RetrieveUpdateDestroyAPIView allows PATCH for partial. I'll change toggleEmployeeStatus to use PATCH.
      
      toast.success("Employee status updated successfully");
      fetchEmployees(search);
    } catch (error) {
      console.error("Error toggling employee status:", error);
      toast.error(error.response?.data?.detail || "Failed to update employee status");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Employees
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all employees in your organization
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              fetchEmployees(value);
            }}
            placeholder="Search Employees..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => {
            setSelectedEmployee(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employee Table */}
      <EmployeeTable 
        employees={employees} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {/* Modal */}
      {openModal && (
        <EmployeeModal
          employee={selectedEmployee}
          fetchEmployees={() => fetchEmployees(search)}
          onClose={() => {
            setOpenModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default Employees;