import axios from "axios";
import { useState, useEffect } from "react";
import ip from "../../ip";
import AddPopup from "./Add";
import EditPopup from "./Edit";
import DeletePopup from "./delete";
import { exportToExcel } from "../utils/exportToExcel";

const Manage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(ip + "admins/all");
      const items = response.data.data.Data;
      setData(Array.isArray(items) ? items : []);
      if (currentPage > Math.ceil(items.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRefresh = () => fetchData();

  const handleEdit = (item) => {
    setSelectedUser(item);
    setShowEditPopup(true);
  };

  const handleDelete = async (data) => {
    await axios.delete(ip + "admins/delete/" + data.Id);
    fetchData();
  };

  return (
    <div className="manage-container">
      <div className="header-inline">
        <h2>Admin Management</h2>
        <button className="btn edit" onClick={() => setShowAddPopup(true)}>
          +
        </button>
      </div>
      <AddPopup
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onSuccess={handleRefresh}
      />
      <EditPopup
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onSuccess={handleRefresh}
        data={selectedUser}
      />
      <DeletePopup
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        data={selectedData}
      />
      <button onClick={() => exportToExcel(data)} className="btn edit">
        Export to Excel
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Level</th>
            <th>Wilayah</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No data available.
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.Id}>
                <td>{item.Username}</td>
                <td>{item.Level}</td>
                <td>{item.For === "" ? "Pusat" : item.For}</td>
                <td className="actions-column">
                  <button className="btn edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => {
                      setSelectedData(item); // or set by id
                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1 || totalPages === 0}
        >
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Manage;
