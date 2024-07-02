import React from "react";
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
          {/* <h6 className="ms-2">Resourcing Acumen</h6> */}
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

const UsersColumnMapping = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <>
      {" "}
      <div className="d-flex">
        <Sidebar handleLogout={handleLogout} />
        <div className="flex-grow-1">
          <div className="container-fluid mt-4 text-center fw-bold">
            <h1>Welcome to Users Column Mapping Page</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersColumnMapping;
