import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import { getEmployees } from "../../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      console.log(data);
      setEmployees(data.results);
    } catch (error) {
      console.log("Employee API Error:", error);
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
            placeholder="Search Employees..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employee Table */}
      <EmployeeTable employees={employees} />

      {/* Modal */}
      {openModal && (
        <EmployeeModal
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Employees;