import { useState } from "react";
import DashboardComp from "./dashboardComp";
import Manage from "../management/manage";

const Dashboard = () => {
  const isPusat = localStorage.getItem("level") === "Pusat";
  const [isDashboard, setIsDashboard] = useState(true);
  const user = localStorage.getItem("name");

  const ToggleMenu = (a) => {
    if (a) setIsDashboard(true);
    else setIsDashboard(false);
  };

  return (
    <div className="dashboard-container">
      <h2 className="header-inline">Halo {user}!</h2>
      {/* Section 1: Navigation Buttons */}
      <div className="dashboard-section nav-section">
        <button className="nav-button" onClick={() => ToggleMenu(1)}>
          Dashboard
        </button>
        {isPusat && (
          <button className="nav-button" onClick={() => ToggleMenu(0)}>
            Manage
          </button>
        )}
      </div>

      {isDashboard ? <DashboardComp /> : <Manage />}
    </div>
  );
};

export default Dashboard;
