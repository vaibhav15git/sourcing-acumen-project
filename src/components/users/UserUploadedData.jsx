import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.png";


const Sidebar = () => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={Logo}
            alt=""
            style={{ width: "100%", marginTop: "-20px", marginLeft: "-30px" }}
          />
          {/* <h6 className="ms-2 fw-bold mt-1">Resourcing Acumen</h6> */}
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large">
            <Link to="/user-dashboard">Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="fa-solid fa-upload">
            <Link to="/user-upload-files">Upload Data</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/user-power-bi-data">View Data</Link>
          </CDBSidebarMenuItem> */}
          <CDBSidebarMenuItem icon="fa-solid fa-server">
            <Link to="/user-uploaded-data">Data</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/users-column-mapping">Column Mapping</Link>
          </CDBSidebarMenuItem> */}

          <CDBSidebarMenuItem icon="fa-solid fa-backward">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none text-black"
              data-bs-toggle="modal"
              data-bs-target="#logout-modal"
            >
              Logout
            </button>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

const UserUploadedData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://testsignuplogin.onrender.com/login/filedata/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  return (
    <>
      <div className="d-flex">
        <Sidebar handleLogout={handleLogout} />
        <div className="flex-grow-1">
          <div className="container-fluid mt-4">
            <h1>Hotel Data</h1>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
                <p>Wait a sec...</p>
              </div>
            ) : (
              <table className="table table-hover table-nowrap align-middle table-borderless">
                <thead>
                  <tr className="table-success">
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Hotel Chain</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Number</th>
                    <th scope="col">Price/Night</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index} className="table-row-hover">
                        <td>{index + 1}</td>
                        <td>{item.hotel_chain}</td>
                        <td>{item.room_type}</td>
                        <td>{item.number}</td>
                        <td>{item.price_per_night}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-danger">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <div>
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
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logout Modal */}
    </>
  );
};

export default UserUploadedData;
