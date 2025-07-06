import { useState } from "react";

const RekapitulasiTable = ({ data, isKelurahan }) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (!Array.isArray(data) || data.length === 0)
    return <div>Data tidak tersedia.</div>;

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {isKelurahan ? (
        <table cellPadding="8" className="styled-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>No. Hp</th>
              <th>Provinsi</th>
              <th>Kabupaten</th>
              <th>Kecamatan</th>
              <th>Kelurahan</th>
              <th>Tanggal Mendaftar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const rowIndex = indexOfFirstItem + index + 1;
              const date = new Date(item.tanggalDaftar);
              const formattedDate = date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <tr key={index}>
                  <td>{rowIndex}</td>
                  <td>{item.nama}</td>
                  <td>{item.nik}</td>
                  <td>{item.noHp}</td>
                  <td>{item.provinsi}</td>
                  <td>{item.kabupaten}</td>
                  <td>{item.kecamatan}</td>
                  <td>{item.kelurahan}</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table cellPadding="8" className="styled-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Wilayah</th>
              <th>Total Anggota</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const rowIndex = indexOfFirstItem + index + 1;
              return (
                <tr key={index}>
                  <td>{rowIndex}</td>
                  <td>{item.Wilayah}</td>
                  <td>{item.TotalAnggota}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Pagination controls */}
      <div className="pagination" style={{ marginTop: "1rem" }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default RekapitulasiTable;
