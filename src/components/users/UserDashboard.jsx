// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./AdminUserList.css";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";

// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
//       <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
//         <div
//           className="container"
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <img
//             src={
//               "https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png"
//             }
//             alt=""
//             style={{ width: "30px" }}
//           />
//           <h6 className="ms-2">SIDE-BAR</h6>
//         </div>
//       </CDBSidebarHeader>
//       <CDBSidebarContent>
//         <CDBSidebarMenu>
//           <CDBSidebarMenuItem icon="th-large">
//             <Link to="/dashboard">Dashboard</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="sticky-note">
//             Upload Data
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="sticky-note">
//             <Link to="/power-bi-data">View Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="sticky-note">
//             <Link to="/admin-user-list">Admin</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="sticky-note">Logout</CDBSidebarMenuItem>
//         </CDBSidebarMenu>
//       </CDBSidebarContent>
//     </CDBSidebar>
//   );
// };

// const Dashboard = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <div className="container-fluid mt-4">
//           <h1>Home Page</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// ----------------------------------------------------

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <div className="d-flex">
        <UserSidebar />

        <div className="flex-grow-1">
          <UserNavbar />
          <div className="container-fluid mt-4 text-center fw-bold">
            <h1>Welcome to User Dashboard !</h1>
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
                  className="btn btn-danger"
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

export default UserDashboard;
