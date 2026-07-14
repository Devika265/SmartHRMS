import StateCard from "../../components/dashboard/StateCard";
import { Users, Building2, CalendarDays, FileText } from "lucide-react";
import { dashboardStates } from "../../data/dashboardData";
import DepartmentChart from "../../components/dashboard/DepartmentChart";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {dashboardStates.map((item) => (
          <StateCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="mt-6">
        <DepartmentChart />
      </div>
    </>
  );
};

export default Dashboard;
