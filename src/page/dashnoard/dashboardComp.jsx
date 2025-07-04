import { useEffect, useState } from "react";
import axios from "axios";
import RekapitulasiTable from "./RekapitulasiTable";
import { exportToExcel } from "../utils/exportToExcel";

const DashboardComp = () => {
  const [stats, setStats] = useState({
    today: 0,
    total: 0,
  });
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
        console.log(statsRes.data.data.Data);
        const rekapRes = await axios.post(
          "http://localhost:8080/admins/rekap",
          {
            level: localStorage.getItem("level"),
            wilayah: localStorage.getItem("for"),
            // level: "Kelurahan",
            // wilayah: "Dago",
            page: 1,
            rowsPerPage: 5,
          }
        );
        console.log(rekapRes.data);

        setStats(statsRes.data.data.Data);
        console.log(stats);
        if (rekapRes.data.Members != null) {
          setRekap(rekapRes.data.Members);
          setIsKelurahan(true);
        } else {
          setRekap(rekapRes.data.Aggregated);
          setIsKelurahan(false);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-container">
      {/* Section 2: Member Stats */}
      <div className="dashboard-section stats-section">
        <div className="stat-card">
          <h3>Member Hari Ini</h3>
          <p>{stats.hari_ini}</p>
        </div>
        <div className="stat-card">
          <h3>Total Member</h3>
          <p>{stats.total}</p>
        </div>
      </div>

      {/* Section 3: Rekapitulasi Data */}
      <div className="dashboard-section rekap-section">
        <div>
          <h2>Rekapitulasi Berdasarkan Level dan Wilayah</h2>
          <button onClick={() => exportToExcel(rekap)} className="login-button">
            Export to Excel
          </button>
        </div>
        <RekapitulasiTable data={rekap} isKelurahan={isKelurahan} />
      </div>
    </div>
  );
};

export default DashboardComp;
