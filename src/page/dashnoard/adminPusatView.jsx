import React, { useState } from "react";
import RegistrationChart from "./RegistrationChart"; // placeholder
import RekapitulasiTable from "./RekapitulasiTable"; // will receive different props
import { exportToExcel } from "../utils/exportToExcel";

const AdminPusatView = () => {
  // Placeholder admin level; later this comes from context or props
  const adminLevel = "admin_kabupaten"; // try "admin_pusat", "admin_provinsi", etc.

  // Dummy stats (same for all levels)
  const [stats] = useState({
    totalToday: 123,
    totalMembers: 4567,
  });

  // Dummy rekap data (summary for levels except kelurahan)
  const summaryData = [
    { no: 1, region: "Jawa Barat", level: "Provinsi", totalMembers: 1000 },
    { no: 2, region: "Bandung", level: "Kabupaten", totalMembers: 300 },
    { no: 3, region: "Coblong", level: "Kecamatan", totalMembers: 150 },
    { no: 4, region: "Dago", level: "Kelurahan", totalMembers: 50 },
  ];

  // Dummy detailed data (for kelurahan level)
  const detailedData = [
    {
      no: 1,
      nama: "Budi",
      nik: "1234567890123456",
      noHp: "081234567890",
      provinsi: "Jawa Barat",
      kabupaten: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
      tanggalDaftar: "2025-07-04",
    },
    {
      no: 2,
      nama: "Siti",
      nik: "6543210987654321",
      noHp: "089876543210",
      provinsi: "Jawa Barat",
      kabupaten: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
      tanggalDaftar: "2025-07-03",
    },
    // Add more...
  ];

  // Select table data based on adminLevel
  const isKelurahan = adminLevel === "admin_kelurahan";
  const tableData = isKelurahan ? detailedData : summaryData;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination handlers
  const handleNextPage = () => {
    if (indexOfLastRow < tableData.length) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-pusat-view" style={{ padding: 20 }}>
      <h2>Dashboard {adminLevel.replace("admin_", "").toUpperCase()}</h2>

      <section style={{ marginBottom: 20 }}>
        <h3>Stats</h3>
        <p>Total anggota hari ini: {stats.totalToday}</p>
        <p>Total anggota: {stats.totalMembers}</p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>Grafik pendaftaran anggota</h3>
        <RegistrationChart />
      </section>

      <section>
        <h3>Rekapitulasi total anggota per wilayah</h3>
        <RekapitulasiTable
          data={currentRows}
          adminLevel={adminLevel}
          isKelurahan={isKelurahan}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastRow >= tableData.length}
            style={{ marginLeft: 10 }}
          >
            Next
          </button>
          <button
            onClick={() => exportToExcel(tableData)}
            style={{ marginLeft: 20 }}
          >
            Export to Excel
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminPusatView;
