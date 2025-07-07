import React, { useState, useEffect } from "react";
import axios from "axios";
import ip from "../../ip";
import data from "../../data";

// const data = {
//   provinsi: {
//     "Jawa Barat": {
//       Kabupaten: {
//         Bandung: {
//           Kecamatan: {
//             Coblong: ["Dago", "Lebakgede", "Cicadas", "Sukajadi", "Cidadap"],
//             Sukasari: [
//               "Cicendo",
//               "Sukamiskin",
//               "Kebonwaruk",
//               "Mekarwangi",
//               "Pasir Kaliki",
//             ],
//             Andir: [
//               "Cijerah",
//               "Kebon Jeruk",
//               "Cikutra",
//               "Padasuka",
//               "Sukamiskin",
//             ],
//             Batununggal: [
//               "Batununggal",
//               "Cijawura",
//               "Cibeunying",
//               "Ujung Berung",
//               "Sukaluyu",
//             ],
//             Mandalajati: [
//               "Cibiru",
//               "Mandalajati",
//               "Cipadung",
//               "Panyileukan",
//               "Cisaranten Kulon",
//             ],
//           },
//         },
//         Bogor: {
//           Kecamatan: {
//             Cibinong: [
//               "Pabuaran",
//               "Cibinong Utara",
//               "Baranangsiang",
//               "Tajur Halang",
//               "Gunung Putri",
//             ],
//             "Gunung Putri": [
//               "Jatimulya",
//               "Gunung Putri",
//               "Cimanggis",
//               "Klapanunggal",
//               "Cileungsi",
//             ],
//             Cileungsi: ["Pasir Kuda", "Nagrak", "Wanasari", "Setu", "Cibinong"],
//             Citeureup: [
//               "Bojong Nangka",
//               "Karang Tengah",
//               "Citeureup",
//               "Sukamanah",
//               "Sukaresmi",
//             ],
//             Jonggol: [
//               "Jonggol",
//               "Wanasari",
//               "Sukamakmur",
//               "Cariu",
//               "Tanjungsari",
//             ],
//           },
//         },
//         Bekasi: {
//           Kecamatan: {
//             "Bekasi Barat": [
//               "Margajaya",
//               "Harapan Jaya",
//               "Kota Baru",
//               "Kayuringin",
//               "Harapan Mulya",
//             ],
//             "Bekasi Timur": [
//               "Jatisari",
//               "Jatibening",
//               "Kota Baru",
//               "Kayuringin Jaya",
//               "Margahayu",
//             ],
//             "Bekasi Selatan": [
//               "Bantar Gebang",
//               "Marga Jaya",
//               "Mekarsari",
//               "Setia Asih",
//               "Pondok Melati",
//             ],
//             "Bekasi Utara": [
//               "Perwira",
//               "Kota Baru",
//               "Harapan Jaya",
//               "Jatirasa",
//               "Jatikramat",
//             ],
//             "Tambun Selatan": [
//               "Tambun",
//               "Tambun Selatan",
//               "Sumber Jaya",
//               "Jatiwaringin",
//               "Setiadarma",
//             ],
//           },
//         },
//         Cirebon: {
//           Kecamatan: {
//             Harjamukti: [
//               "Kejaksan",
//               "Lemahwungkuk",
//               "Harjamukti",
//               "Pekalipan",
//               "Kesambi",
//             ],
//             Kesambi: [
//               "Kesambi",
//               "Kejaksan",
//               "Pekalipan",
//               "Lemahwungkuk",
//               "Harjamukti",
//             ],
//             Pekalipan: [
//               "Pekalipan",
//               "Kesambi",
//               "Kejaksan",
//               "Harjamukti",
//               "Lemahwungkuk",
//             ],
//             Lemahwungkuk: [
//               "Lemahwungkuk",
//               "Harjamukti",
//               "Kejaksan",
//               "Kesambi",
//               "Pekalipan",
//             ],
//             Tengah: [
//               "Tengah",
//               "Sumber",
//               "Kapetakan",
//               "Arjawinangun",
//               "Kedawung",
//             ],
//           },
//         },
//         Sukabumi: {
//           Kecamatan: {
//             Cikole: [
//               "Cikole",
//               "Sitijajar",
//               "Cikangkung",
//               "Cibeureum",
//               "Cikundul",
//             ],
//             Lembursitu: [
//               "Lembursitu",
//               "Cicantayan",
//               "Cikembar",
//               "Cisaat",
//               "Baros",
//             ],
//             Warudoyong: [
//               "Warudoyong",
//               "Baros",
//               "Cikundul",
//               "Citamiang",
//               "Gunung Puyuh",
//             ],
//             "Gunung Puyuh": [
//               "Gunung Puyuh",
//               "Citamiang",
//               "Warudoyong",
//               "Cibeureum",
//               "Cikole",
//             ],
//             Cisaat: ["Cisaat", "Cicurug", "Gunung Guruh", "Nagrak", "Sukaraja"],
//           },
//         },
//       },
//     },
//     "Jawa Tengah": {
//       Kabupaten: {
//         Semarang: {
//           Kecamatan: {
//             Candisari: ["Sragen", "Mijen", "Tembalang", "Genuk", "Gunung Pati"],
//             Tembalang: [
//               "Meteseh",
//               "Sidosari",
//               "Kendal",
//               "Pabelan",
//               "Banyumanik",
//             ],
//             Banyumanik: [
//               "Banyumanik",
//               "Candisari",
//               "Tembalang",
//               "Gayamsari",
//               "Ngaliyan",
//             ],
//             Genuk: ["Genuk", "Tugu", "Gayamsari", "Gunung Pati", "Banyumanik"],
//             "Gunung Pati": [
//               "Gunung Pati",
//               "Banyumanik",
//               "Tembalang",
//               "Genuk",
//               "Ngaliyan",
//             ],
//           },
//         },
//         Surakarta: {
//           Kecamatan: {
//             "Pasar Kliwon": [
//               "Semanggi",
//               "Joyosuran",
//               "Jayengan",
//               "Kestalan",
//               "Sangkrah",
//             ],
//             Laweyan: ["Timuran", "Kepatihan", "Jagalan", "Dulang", "Laweyan"],
//             Serengan: [
//               "Serengan",
//               "Banjarsari",
//               "Kadipiro",
//               "Jayengan",
//               "Kestalan",
//             ],
//             Jebres: ["Jebres", "Kadipiro", "Kerten", "Semanggi", "Joyosuran"],
//             Banjarsari: [
//               "Banjarsari",
//               "Serengan",
//               "Jayengan",
//               "Pasar Kliwon",
//               "Laweyan",
//             ],
//           },
//         },
//         Kudus: {
//           Kecamatan: {
//             "Kota Kudus": ["Jekulo", "Bae", "Gebog", "Mejobo", "Undaan"],
//             Jekulo: ["Jekulo", "Bae", "Gebog", "Mejobo", "Undaan"],
//             Bae: ["Bae", "Gebog", "Jekulo", "Mejobo", "Undaan"],
//             Gebog: ["Gebog", "Bae", "Jekulo", "Mejobo", "Undaan"],
//             Mejobo: ["Mejobo", "Bae", "Gebog", "Jekulo", "Undaan"],
//           },
//         },
//         Pekalongan: {
//           Kecamatan: {
//             "Pekalongan Barat": [
//               "Wiradesa",
//               "Karanganyar",
//               "Kajen",
//               "Tirto",
//               "Bojongsari",
//             ],
//             "Pekalongan Timur": [
//               "Karanganyar",
//               "Kajen",
//               "Wiradesa",
//               "Tirto",
//               "Bojongsari",
//             ],
//             Kesesi: ["Kesesi", "Wonopringgo", "Doro", "Kajen", "Tirto"],
//             Wiradesa: [
//               "Wiradesa",
//               "Kajen",
//               "Bojongsari",
//               "Kesesi",
//               "Wonopringgo",
//             ],
//             Tirto: ["Tirto", "Bojongsari", "Kajen", "Kesesi", "Wiradesa"],
//           },
//         },
//         Magelang: {
//           Kecamatan: {
//             "Magelang Tengah": [
//               "Rejowinangun",
//               "Magelang Selatan",
//               "Magelang Utara",
//               "Tegalrejo",
//               "Gelangan",
//             ],
//             "Magelang Selatan": [
//               "Magelang Selatan",
//               "Gelangan",
//               "Tegalrejo",
//               "Magelang Tengah",
//               "Magelang Utara",
//             ],
//             "Magelang Utara": [
//               "Magelang Utara",
//               "Magelang Tengah",
//               "Gelangan",
//               "Tegalrejo",
//               "Magelang Selatan",
//             ],
//             Tegalrejo: [
//               "Tegalrejo",
//               "Magelang Tengah",
//               "Gelangan",
//               "Magelang Utara",
//               "Magelang Selatan",
//             ],
//             Gelangan: [
//               "Gelangan",
//               "Magelang Selatan",
//               "Tegalrejo",
//               "Magelang Utara",
//               "Magelang Tengah",
//             ],
//           },
//         },
//       },
//     },
//   },
// };

// const registeredKTPs = ["1234567890123456"];
// const registeredPhones = ["081234567890"];

// // export default function RegistrationForm() {
// //   const [form, setForm] = useState({
// //     ktp: "",
// //     nama: "",
// //     phone: "",
// //     provinsi: "",
// //     kabupaten: "",
// //     kecamatan: "",
// //     kelurahan: "",
// //   });

// //   const [errors, setErrors] = useState({});

// //   const [kabupatenOptions, setKabupatenOptions] = useState([]);
// //   const [kecamatanOptions, setKecamatanOptions] = useState([]);
// //   const [kelurahanOptions, setKelurahanOptions] = useState([]);

// //   useEffect(() => {
// //     if (form.provinsi && data.provinsi[form.provinsi]) {
// //       setKabupatenOptions(Object.keys(data.provinsi[form.provinsi].Kabupaten));
// //     } else {
// //       setKabupatenOptions([]);
// //     }
// //     setForm((f) => ({ ...f, kabupaten: "", kecamatan: "", kelurahan: "" }));
// //     setKecamatanOptions([]);
// //     setKelurahanOptions([]);
// //   }, [form.provinsi]);

// //   useEffect(() => {
// //     if (
// //       form.provinsi &&
// //       form.kabupaten &&
// //       data.provinsi[form.provinsi]?.Kabupaten[form.kabupaten]
// //     ) {
// //       setKecamatanOptions(
// //         Object.keys(
// //           data.provinsi[form.provinsi].Kabupaten[form.kabupaten].Kecamatan
// //         )
// //       );
// //     } else {
// //       setKecamatanOptions([]);
// //     }
// //     setForm((f) => ({ ...f, kecamatan: "", kelurahan: "" }));
// //     setKelurahanOptions([]);
// //   }, [form.kabupaten, form.provinsi]);

// //   useEffect(() => {
// //     if (
// //       form.provinsi &&
// //       form.kabupaten &&
// //       form.kecamatan &&
// //       data.provinsi[form.provinsi]?.Kabupaten[form.kabupaten]?.Kecamatan[
// //         form.kecamatan
// //       ]
// //     ) {
// //       setKelurahanOptions(
// //         data.provinsi[form.provinsi].Kabupaten[form.kabupaten].Kecamatan[
// //           form.kecamatan
// //         ]
// //       );
// //     } else {
// //       setKelurahanOptions([]);
// //     }
// //     setForm((f) => ({ ...f, kelurahan: "" }));
// //   }, [form.kabupaten, form.kecamatan, form.provinsi]);

// //   function validate() {
// //     const newErrors = {};

// //     if (!form.ktp) newErrors.ktp = "No. KTP wajib diisi.";
// //     else if (!/^\d+$/.test(form.ktp)) newErrors.ktp = "No. KTP harus angka.";
// //     else if (form.ktp.length !== 16) newErrors.ktp = "No. KTP harus 16 digit.";
// //     else if (registeredKTPs.includes(form.ktp))
// //       newErrors.ktp = "No. KTP sudah terdaftar.";

// //     if (!form.nama) newErrors.nama = "Nama wajib diisi.";

// //     if (!form.phone) newErrors.phone = "No. Handphone wajib diisi.";
// //     else if (!/^\d+$/.test(form.phone))
// //       newErrors.phone = "No. Handphone harus angka.";
// //     else if (registeredPhones.includes(form.phone))
// //       newErrors.phone = "No. Handphone sudah terdaftar.";

// //     if (!form.provinsi) newErrors.provinsi = "Provinsi wajib dipilih.";
// //     if (!form.kabupaten) newErrors.kabupaten = "Kabupaten wajib dipilih.";
// //     if (!form.kecamatan) newErrors.kecamatan = "Kecamatan wajib dipilih.";
// //     if (!form.kelurahan) newErrors.kelurahan = "Kelurahan wajib dipilih.";

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   }

// //   function handleChange(e) {
// //     const { name, value } = e.target;
// //     setForm((f) => ({ ...f, [name]: value }));
// //   }

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     if (validate()) {
// //       alert("Pendaftaran berhasil!\n" + JSON.stringify(form, null, 2));
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="form-container" noValidate>
// //       <h2 className="form-heading">Form Pendaftaran</h2>

// //       {/* No. KTP */}
// //       <div className="form-field">
// //         <label htmlFor="ktp" className="form-label">
// //           No. KTP <span className="required">*</span>
// //         </label>
// //         <input
// //           id="ktp"
// //           type="text"
// //           name="ktp"
// //           maxLength={16}
// //           value={form.ktp}
// //           onChange={handleChange}
// //           className={`form-input ${errors.ktp ? "input-error" : ""}`}
// //           placeholder="Masukkan No. KTP"
// //         />
// //         {errors.ktp && <div className="form-error">{errors.ktp}</div>}
// //       </div>

// //       {/* Nama */}
// //       <div className="form-field">
// //         <label htmlFor="nama" className="form-label">
// //           Nama <span className="required">*</span>
// //         </label>
// //         <input
// //           id="nama"
// //           type="text"
// //           name="nama"
// //           value={form.nama}
// //           onChange={handleChange}
// //           className={`form-input ${errors.nama ? "input-error" : ""}`}
// //           placeholder="Masukkan Nama"
// //         />
// //         {errors.nama && <div className="form-error">{errors.nama}</div>}
// //       </div>

// //       {/* No. Handphone */}
// //       <div className="form-field">
// //         <label htmlFor="phone" className="form-label">
// //           No. Handphone <span className="required">*</span>
// //         </label>
// //         <input
// //           id="phone"
// //           type="text"
// //           name="phone"
// //           value={form.phone}
// //           onChange={handleChange}
// //           className={`form-input ${errors.phone ? "input-error" : ""}`}
// //           placeholder="Masukkan No. Handphone"
// //         />
// //         {errors.phone && <div className="form-error">{errors.phone}</div>}
// //       </div>

// //       {/* Provinsi */}
// //       <div className="form-field">
// //         <label htmlFor="provinsi" className="form-label">
// //           Provinsi <span className="required">*</span>
// //         </label>
// //         <select
// //           id="provinsi"
// //           name="provinsi"
// //           value={form.provinsi}
// //           onChange={handleChange}
// //           className={`form-select ${errors.provinsi ? "input-error" : ""}`}
// //         >
// //           <option value="">-- Pilih Provinsi --</option>
// //           {Object.keys(data.provinsi).map((prov) => (
// //             <option key={prov} value={prov}>
// //               {prov}
// //             </option>
// //           ))}
// //         </select>
// //         {errors.provinsi && <div className="form-error">{errors.provinsi}</div>}
// //       </div>

// //       {/* Kabupaten */}
// //       <div className="form-field">
// //         <label htmlFor="kabupaten" className="form-label">
// //           Kabupaten <span className="required">*</span>
// //         </label>
// //         <select
// //           id="kabupaten"
// //           name="kabupaten"
// //           value={form.kabupaten}
// //           onChange={handleChange}
// //           className={`form-select ${errors.kabupaten ? "input-error" : ""}`}
// //           disabled={!kabupatenOptions.length}
// //         >
// //           <option value="">-- Pilih Kabupaten --</option>
// //           {kabupatenOptions.map((kab) => (
// //             <option key={kab} value={kab}>
// //               {kab}
// //             </option>
// //           ))}
// //         </select>
// //         {errors.kabupaten && (
// //           <div className="form-error">{errors.kabupaten}</div>
// //         )}
// //       </div>

// //       {/* Kecamatan */}
// //       <div className="form-field">
// //         <label htmlFor="kecamatan" className="form-label">
// //           Kecamatan <span className="required">*</span>
// //         </label>
// //         <select
// //           id="kecamatan"
// //           name="kecamatan"
// //           value={form.kecamatan}
// //           onChange={handleChange}
// //           className={`form-select ${errors.kecamatan ? "input-error" : ""}`}
// //           disabled={!kecamatanOptions.length}
// //         >
// //           <option value="">-- Pilih Kecamatan --</option>
// //           {kecamatanOptions.map((kec) => (
// //             <option key={kec} value={kec}>
// //               {kec}
// //             </option>
// //           ))}
// //         </select>
// //         {errors.kecamatan && (
// //           <div className="form-error">{errors.kecamatan}</div>
// //         )}
// //       </div>

// //       {/* Kelurahan */}
// //       <div className="form-field">
// //         <label htmlFor="kelurahan" className="form-label">
// //           Kelurahan <span className="required">*</span>
// //         </label>
// //         <select
// //           id="kelurahan"
// //           name="kelurahan"
// //           value={form.kelurahan}
// //           onChange={handleChange}
// //           className={`form-select ${errors.kelurahan ? "input-error" : ""}`}
// //           disabled={!kelurahanOptions.length}
// //         >
// //           <option value="">-- Pilih Kelurahan --</option>
// //           {kelurahanOptions.map((kel) => (
// //             <option key={kel} value={kel}>
// //               {kel}
// //             </option>
// //           ))}
// //         </select>
// //         {errors.kelurahan && (
// //           <div className="form-error">{errors.kelurahan}</div>
// //         )}
// //       </div>

// //       <button type="submit" className="form-button">
// //         Daftar
// //       </button>
// //     </form>
// //   );
// // }

export default function RegistrationForm() {
  const [form, setForm] = useState({
    ktp: "",
    nama: "",
    phone: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  });

  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  const [kabupatenOptions, setKabupatenOptions] = useState([]);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);
  const [kelurahanOptions, setKelurahanOptions] = useState([]);

  // ---- Update options based on selections ----
  useEffect(() => {
    if (form.provinsi && data.provinsi[form.provinsi]) {
      setKabupatenOptions(Object.keys(data.provinsi[form.provinsi].Kabupaten));
    } else {
      setKabupatenOptions([]);
    }
    setForm((f) => ({ ...f, kabupaten: "", kecamatan: "", kelurahan: "" }));
    setKecamatanOptions([]);
    setKelurahanOptions([]);
  }, [form.provinsi]);

  useEffect(() => {
    if (
      form.provinsi &&
      form.kabupaten &&
      data.provinsi[form.provinsi]?.Kabupaten[form.kabupaten]
    ) {
      setKecamatanOptions(
        Object.keys(
          data.provinsi[form.provinsi].Kabupaten[form.kabupaten].Kecamatan
        )
      );
    } else {
      setKecamatanOptions([]);
    }
    setForm((f) => ({ ...f, kecamatan: "", kelurahan: "" }));
    setKelurahanOptions([]);
  }, [form.kabupaten, form.provinsi]);

  useEffect(() => {
    if (
      form.provinsi &&
      form.kabupaten &&
      form.kecamatan &&
      data.provinsi[form.provinsi]?.Kabupaten[form.kabupaten]?.Kecamatan[
        form.kecamatan
      ]
    ) {
      setKelurahanOptions(
        data.provinsi[form.provinsi].Kabupaten[form.kabupaten].Kecamatan[
          form.kecamatan
        ]
      );
    } else {
      setKelurahanOptions([]);
    }
    setForm((f) => ({ ...f, kelurahan: "" }));
  }, [form.kabupaten, form.kecamatan, form.provinsi]);

  // ---- Validation ----
  function validate() {
    const newErrors = {};
    if (!form.ktp) newErrors.ktp = "No. KTP wajib diisi.";
    else if (!/^\d+$/.test(form.ktp)) newErrors.ktp = "No. KTP harus angka.";
    else if (form.ktp.length !== 16) newErrors.ktp = "No. KTP harus 16 digit.";

    if (!form.nama) newErrors.nama = "Nama wajib diisi.";

    if (!form.phone) newErrors.phone = "No. Handphone wajib diisi.";
    else if (!/^\d+$/.test(form.phone)) newErrors.phone = "Harus berupa angka.";

    if (!form.provinsi) newErrors.provinsi = "Pilih provinsi.";
    if (!form.kabupaten) newErrors.kabupaten = "Pilih kabupaten.";
    if (!form.kecamatan) newErrors.kecamatan = "Pilih kecamatan.";
    if (!form.kelurahan) newErrors.kelurahan = "Pilih kelurahan.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ---- Handlers ----
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      nik: form.ktp,
      nama: form.nama,
      no_hp: form.phone,
      provinsi: form.provinsi,
      kabupaten: form.kabupaten,
      kecamatan: form.kecamatan,
      kelurahan: form.kelurahan,
    };

    try {
      await axios.post(ip + "members/add", payload);
      setSuccessPopup(true);
      setForm({
        ktp: "",
        nama: "",
        phone: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
      });
    } catch (err) {
      alert("Terjadi kesalahan saat mendaftar.");
      console.error(err);
    }
  }

  return (
    <>
      {successPopup && (
        <div className="popup-success">
          <div className="popup-content">
            <p>Pendaftaran berhasil!</p>
            <button
              onClick={() => setSuccessPopup(false)}
              className="login-button"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="form-container shadow"
        noValidate
      >
        <h2 className="form-heading">Form Pendaftaran</h2>

        {/* No. KTP */}
        <div className="form-field">
          <label htmlFor="ktp" className="form-label">
            No. KTP <span className="required">*</span>
          </label>
          <input
            id="ktp"
            type="text"
            name="ktp"
            maxLength={16}
            value={form.ktp}
            onChange={handleChange}
            className={`form-input ${errors.ktp ? "input-error" : ""}`}
            placeholder="Masukkan No. KTP"
          />
          {errors.ktp && <div className="form-error">{errors.ktp}</div>}
        </div>

        {/* Nama */}
        <div className="form-field">
          <label htmlFor="nama" className="form-label">
            Nama <span className="required">*</span>
          </label>
          <input
            id="nama"
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className={`form-input ${errors.nama ? "input-error" : ""}`}
            placeholder="Masukkan Nama"
          />
          {errors.nama && <div className="form-error">{errors.nama}</div>}
        </div>

        {/* No. Handphone */}
        <div className="form-field">
          <label htmlFor="phone" className="form-label">
            No. Handphone <span className="required">*</span>
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? "input-error" : ""}`}
            placeholder="Masukkan No. Handphone"
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        {/* Provinsi */}
        <div className="form-field">
          <label htmlFor="provinsi" className="form-label">
            Provinsi <span className="required">*</span>
          </label>
          <select
            id="provinsi"
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            className={`form-select ${errors.provinsi ? "input-error" : ""}`}
          >
            <option value="">-- Pilih Provinsi --</option>
            {Object.keys(data.provinsi).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          {errors.provinsi && (
            <div className="form-error">{errors.provinsi}</div>
          )}
        </div>

        {/* Kabupaten */}
        <div className="form-field">
          <label htmlFor="kabupaten" className="form-label">
            Kabupaten <span className="required">*</span>
          </label>
          <select
            id="kabupaten"
            name="kabupaten"
            value={form.kabupaten}
            onChange={handleChange}
            className={`form-select ${errors.kabupaten ? "input-error" : ""}`}
            disabled={!kabupatenOptions.length}
          >
            <option value="">-- Pilih Kabupaten --</option>
            {kabupatenOptions.map((kab) => (
              <option key={kab} value={kab}>
                {kab}
              </option>
            ))}
          </select>
          {errors.kabupaten && (
            <div className="form-error">{errors.kabupaten}</div>
          )}
        </div>

        {/* Kecamatan */}
        <div className="form-field">
          <label htmlFor="kecamatan" className="form-label">
            Kecamatan <span className="required">*</span>
          </label>
          <select
            id="kecamatan"
            name="kecamatan"
            value={form.kecamatan}
            onChange={handleChange}
            className={`form-select ${errors.kecamatan ? "input-error" : ""}`}
            disabled={!kecamatanOptions.length}
          >
            <option value="">-- Pilih Kecamatan --</option>
            {kecamatanOptions.map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
          </select>
          {errors.kecamatan && (
            <div className="form-error">{errors.kecamatan}</div>
          )}
        </div>

        {/* Kelurahan */}
        <div className="form-field">
          <label htmlFor="kelurahan" className="form-label">
            Kelurahan <span className="required">*</span>
          </label>
          <select
            id="kelurahan"
            name="kelurahan"
            value={form.kelurahan}
            onChange={handleChange}
            className={`form-select ${errors.kelurahan ? "input-error" : ""}`}
            disabled={!kelurahanOptions.length}
          >
            <option value="">-- Pilih Kelurahan --</option>
            {kelurahanOptions.map((kel) => (
              <option key={kel} value={kel}>
                {kel}
              </option>
            ))}
          </select>
          {errors.kelurahan && (
            <div className="form-error">{errors.kelurahan}</div>
          )}
        </div>
        <button type="submit" className="form-button">
          Daftar
        </button>
      </form>
    </>
  );
}
