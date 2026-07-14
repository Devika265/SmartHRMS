import StateCard from "../../components/dashboard/StateCard";
import { Users, Building2, CalendarDays, FileText } from "lucide-react";
import { dashboardStates } from "../../data/dashboardData";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import RecentEmployees from "../../components/dashboard/RecentEmployees";
import { getDashboardData } from "../../services/dashboardService";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 gap-6">
        {dashboardStates.map((item) => (
          <StateCard
            key={item.id}
            title={item.title}
            value={dashboardData?.[item.key] ?? 0}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <DepartmentChart />

        <RecentEmployees />
      </div>
    </>
  );
};

export default Dashboard;
