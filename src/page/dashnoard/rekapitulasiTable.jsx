const RekapitulasiTable = ({ data, isKelurahan }) => {
  if (!data) return <div>Data tidak tersedia.</div>;

  console.log(isKelurahan);
  console.log(data);

  if (isKelurahan && Array.isArray(data)) {
    return (
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
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
          {data.map((member, index) => {
            const date = new Date(member.tanggalDaftar);
            const formattedDate = date.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{member.nama}</td>
                <td>{member.nik}</td>
                <td>{member.noHp}</td>
                <td>{member.provinsi}</td>
                <td>{member.kabupaten}</td>
                <td>{member.kecamatan}</td>
                <td>{member.kelurahan}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else if (Array.isArray(data)) {
    return (
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Wilayah</th>
            <th>Total Anggota</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.No}</td>
              <td>{item.Wilayah}</td>
              <td>{item.TotalAnggota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <div>Tidak ada data untuk ditampilkan.</div>;
};

export default RekapitulasiTable;
