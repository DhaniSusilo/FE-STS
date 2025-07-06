import { useState } from "react";
import axios from "axios";
import ip from "../../ip";
import wilayahData from "../../data";

const AddPopup = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    level: "",
    for: "",
  });

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
    if (!form.username) err.username = "Username wajib diisi.";
    if (!form.firstName) err.firstName = "Nama depan wajib diisi.";
    if (!form.lastName) err.lastName = "Nama belakang wajib diisi.";
    if (!form.password) err.password = "Password wajib diisi.";
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Konfirmasi password tidak cocok.";
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
      await axios.post(ip + "users/register", form);
      onSuccess();
      onClose();
      alert("Berhasil Menambah Data");
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
        <h2 className="form-heading">Tambah Admin</h2>

        {/* Username */}
        <div className="form-field">
          <label className="form-label">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={`form-input ${errors.username ? "input-error" : ""}`}
            placeholder="Masukkan username"
          />
          {errors.username && (
            <div className="form-error">{errors.username}</div>
          )}
        </div>

        {/* First Name */}
        <div className="form-field">
          <label className="form-label">Nama Depan</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={`form-input ${errors.firstName ? "input-error" : ""}`}
            placeholder="Masukkan nama depan"
          />
          {errors.firstName && (
            <div className="form-error">{errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="form-field">
          <label className="form-label">Nama Belakang</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? "input-error" : ""}`}
            placeholder="Masukkan nama belakang"
          />
          {errors.lastName && (
            <div className="form-error">{errors.lastName}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? "input-error" : ""}`}
            placeholder="Masukkan password"
          />
          {errors.password && (
            <div className="form-error">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-field">
          <label className="form-label">Konfirmasi Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`form-input ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            placeholder="Ulangi password"
          />
          {errors.confirmPassword && (
            <div className="form-error">{errors.confirmPassword}</div>
          )}
        </div>

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

export default AddPopup;
