const DeletePopup = ({ isOpen, onClose, onConfirm, data }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await onConfirm(data); // usually passes the ID or username
      onClose();
      alert("Data Berhasil Dihapus");
    } catch (err) {
      alert("Gagal menghapus data.");
      console.error(err);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="form-container shadow popup"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-heading">Konfirmasi Hapus</h2>
        <p>
          Apakah Anda yakin ingin menghapus admin{" "}
          <strong>{data?.Username}</strong>?
        </p>

        <div className="form-field" style={{ display: "flex", gap: "1rem" }}>
          <button className="form-button" onClick={onClose}>
            Batal
          </button>
          <button
            className="form-button"
            style={{ backgroundColor: "#dc3545" }}
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
