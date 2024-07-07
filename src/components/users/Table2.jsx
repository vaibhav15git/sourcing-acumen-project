import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";

const Table2 = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const rowsPerPage = 1;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://testsignuplogin.onrender.com/login/filedata2/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const columnNames = Object.keys(response.data[0]);
          setColumns(columnNames);
          setData(response.data);
          setTotalPages(Math.ceil(response.data.length / rowsPerPage));
        } else {
          console.error("Expected an array but got:", response.data);
          setColumns([]);
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setColumns([]);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="table-component">
      <div className="d-flex">
        <div className="sidebar-wrapper">
          <UserSidebar handleLogout={handleLogout} />
        </div>
        <div className="flex-grow-1">
          <UserNavbar />
          <div className="container-fluid mt-4">
            <h1>Data Table</h1>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading data...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-hover table-striped table-bordered">
                    <thead className="table-success">
                      <tr>
                        {columns.map((columnName, index) => (
                          <th key={index} scope="col">
                            {columnName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((columnName, colIndex) => (
                            <td key={colIndex}>{rowData[columnName]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="pagination-container float-start me-5"
                  aria-label="Page navigation"
                >
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link bg-body-secondary text-black"
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link bg-body-secondary text-black"
                          href="#"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link bg-body-secondary text-black"
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logout-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Are you sure you want to log out?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table2;
