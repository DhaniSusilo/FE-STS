import { useEffect, useState } from "react";
import axios from "axios";
import RekapitulasiTable from "./RekapitulasiTable";
import { exportToExcel } from "../utils/exportToExcel";

const DashboardComp = () => {
  const [stats, setStats] = useState({ hari_ini: 0, total: 0 });
  const [rekap, setRekap] = useState([]);
  const [isKelurahan, setIsKelurahan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.post(
          "http://localhost:8080/admins/dashboard",
          {
            level: localStorage.getItem("level"),
            for: localStorage.getItem("for"),
          }
        );

        const rekapRes = await axios.post(
          "http://localhost:8080/admins/rekap",
          {
            level: localStorage.getItem("level"),
            wilayah: localStorage.getItem("for"),
            page: 1,
            rowsPerPage: 5,
          }
        );

        const statsData = statsRes.data?.data?.Data ?? { today: 0, total: 0 };
        setStats(statsData);

        if (rekapRes.data.Members != null) {
          setRekap(rekapRes.data.Members);
          setIsKelurahan(true);
        } else {
          setRekap(rekapRes.data.Aggregated ?? []);
          setIsKelurahan(false);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-section stats-section">
        <div className="stat-card shadow">
          <h3>Member Hari Ini</h3>
          <p>{stats.hari_ini}</p>
        </div>
        <div className="stat-card shadow">
          <h3>Total Member</h3>
          <p>{stats.total}</p>
        </div>
      </div>

      <div className="dashboard-section rekap-section">
        <div>
          <h2 className="header-inline">
            Rekapitulasi Berdasarkan Level dan Wilayah
            <button onClick={() => exportToExcel(rekap)} className="btn edit">
              Export to Excel
            </button>
          </h2>
        </div>
        <RekapitulasiTable data={rekap} isKelurahan={isKelurahan} />
      </div>
    </div>
  );
};

export default DashboardComp;
