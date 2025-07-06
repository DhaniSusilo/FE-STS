import { useState } from "react";
import axios from "axios";
import ip from "../../ip";
import wilayahData from "../../data";

const EditPopup = ({ isOpen, onClose, onSuccess, data }) => {
  const [form, setForm] = useState({
    username: data.Username ?? "",
    // firstName: "",
    // lastName: "",
    // password: "",
    // confirmPassword: "",
    level: data.Level ?? "",
    for: data.For ?? "",
  });

  console.log(data.Username);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset 'for' if level changes
      ...(name === "level" ? { for: "" } : {}),
    }));
  };

  const validate = () => {
    const err = {};
    // if (!form.username) err.username = "Username wajib diisi.";
    // if (!form.firstName) err.firstName = "Nama depan wajib diisi.";
    // if (!form.lastName) err.lastName = "Nama belakang wajib diisi.";
    if (!form.level) err.level = "Level wajib dipilih.";
    if (!form.for && form.level !== "Pusat") err.for = "Wilayah wajib dipilih.";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await axios.post(ip + "admins/edit", {
        Username: data.Username,
        Level: form.level,
        For: form.for,
      });
      console.log(form);

      onSuccess();
      onClose();
      alert("Berhasil Mengubah Data");
    } catch (err) {
      alert("Gagal menyimpan data.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const levelOptions = [
    "Pusat",
    "Provinsi",
    "Kabupaten",
    "Kecamatan",
    "Kelurahan",
  ];
  const wilayahOptions = (() => {
    switch (form.level) {
      case "Provinsi":
        return Object.keys(wilayahData.provinsi).sort();

      case "Kabupaten":
        return Object.values(wilayahData.provinsi)
          .flatMap((provinsi) => Object.keys(provinsi.Kabupaten || {}))
          .sort();

      case "Kecamatan":
        return Object.values(wilayahData.provinsi)
          .flatMap((provinsi) =>
            Object.values(provinsi.Kabupaten || {}).flatMap((kabupaten) =>
              Object.keys(kabupaten.Kecamatan || {})
            )
          )
          .sort();

      case "Kelurahan":
        return Object.values(wilayahData.provinsi)
          .flatMap((provinsi) =>
            Object.values(provinsi.Kabupaten || {}).flatMap((kabupaten) =>
              Object.values(kabupaten.Kecamatan || {}).flatMap(
                (kelurahanList) =>
                  Array.isArray(kelurahanList) ? kelurahanList : []
              )
            )
          )
          .sort();

      default:
        return [];
    }
  })();

  return (
    <div className="popup-overlay" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="form-container shadow popup"
        noValidate
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-heading">Ubah Admin</h2>
        <div className="form-heading">{data.Username}</div>

        {/* Level */}
        <div className="form-field">
          <label className="form-label">Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className={`form-select ${errors.level ? "input-error" : ""}`}
          >
            <option value="">-- Pilih Level --</option>
            {levelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && <div className="form-error">{errors.level}</div>}
        </div>

        {/* For / Wilayah */}
        <div className="form-field">
          <label className="form-label">Wilayah</label>
          <select
            name="for"
            value={form.for}
            onChange={handleChange}
            className={`form-select ${errors.for ? "input-error" : ""}`}
            disabled={form.level === "Pusat"}
          >
            <option value="">-- Pilih Wilayah --</option>
            {wilayahOptions.map((wil) => (
              <option key={wil} value={wil}>
                {wil}
              </option>
            ))}
          </select>
          {errors.for && <div className="form-error">{errors.for}</div>}
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default EditPopup;
