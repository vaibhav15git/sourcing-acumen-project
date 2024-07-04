import React, { useState } from 'react'
import logo from "./Logo.jpg"
import "./UserLandingPage.css"
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaGear } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
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
          {/* <CDBSidebarMenuItem icon="fa-solid fa-upload">
            <Link to="/user-upload-files">Upload Data</Link>
          </CDBSidebarMenuItem> */}

          <CDBSidebarMenuItem icon="fa-solid fa-upload">
            <Link to="/user-landing-page">Input Data</Link>
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


const UserLandingPage = () => {
  const navigate = useNavigate();
     const handleLogout = () => {
       // Clear token from local storage
       localStorage.removeItem("token");

       navigate("/");
     };
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <nav>
            <div className="navbar-logo">
              <div className="d-flex justify-content-between">
                <div className="w-50 remove-logo">
                  {" "}
                  <img src={logo} alt="" />
                </div>
                <div className="right-side-main-div">
                  <div className=" float-end me-4 mt-3">
                    <div className="dropdown ">
                      <button
                        className="btn rounded-circle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          background: "#223244",
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        VJ
                      </button>
                      <span style={{ fontSize: "12px" }} className="mx-1">
                        Vaibhav Jaware
                      </span>
                      <ul className="dropdown-menu menu-edit shadow-lg">
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="me-3">
                              <CgProfile />
                            </span>
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="me-3">
                              <FaGear />
                            </span>
                            Setting
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item text-danger"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#logout-modal"
                          >
                            <span className="me-3">
                              <IoIosLogOut />
                            </span>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navy-strip"></div>
              <div className="gradient-strip"></div>
            </div>
          </nav>

          <div className="landing-page-main-div">
            {/* <div className="d-flex justify-content-center pt-3">
          <Link to="" className="arrow-shape">
            Input Data
          </Link>

          <Link
            to="/user-dashboard"
            className="arrow-shape space-btw text-white"
          >
            <Link to="/user-dashboard" className="text-white">
              View Dashboard
            </Link>
          </Link>
        </div> */}
            <div className="d-flex justify-content-center pt-3">
              <Link to="" className="button-link">
                <button className="button">
                  <span className="button-content">Input Data</span>
                </button>
              </Link>

              <Link to="/user-dashboard" className="button-link">
                <button className="button">
                  <span className="button-content">View Dashboard</span>
                </button>
              </Link>
            </div>

            <div className="container mt-5">
              <div className="row">
                <div className="col-md-4">
                  <div className="card py-4">
                    <div className="card-body text-center ">
                      <h5 className="card-title">Upload 'Table 1'</h5>
                      <i className="fas fa-upload fa-2x mb-2" />
                    </div>
                    <Button
                      style={{ backgroundColor: "#223244" }}
                      variant=""
                      className="px-5 py-2 w-50 m-auto text-white"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Browse
                    </Button>
                  </div>
                  <p className="card-text text-white mt-3">
                    Your have submitted data with X rows and Y columns
                  </p>
                  {/* <Button className="btn full-width-button py-2 mt-5 button">
                Preview submitted data
              </Button> */}
                  <div
                    style={{ width: "100%" }}
                    className=" justify-content-center pt-3 mt-4"
                  >
                    <Link to="" className="button-link ">
                      <button
                        style={{ width: "60%" }}
                        className="button new-btn"
                      >
                        <span className="button-content">
                          Preview submitted data
                        </span>
                      </button>
                    </Link>

                    {/* <Link to="/user-dashboard" className="button-link">
                  <button className="button">
                    <span className="button-content">View Dashboard</span>
                  </button>
                </Link> */}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card py-4">
                    <div className="card-body text-center">
                      <h5 className="card-title">Upload 'Table 2'</h5>
                      <i className="fas fa-upload fa-2x mb-2" />
                    </div>
                    <Button
                      style={{ backgroundColor: "#223244" }}
                      variant=""
                      className="px-5 py-2 w-50 m-auto text-white"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Browse
                    </Button>
                  </div>
                  <p className="card-text text-white mt-3 ">
                    Your have submitted data with X rows and Y columns
                  </p>
                  {/* <Button className="btn full-width-button py-2 mt-5">
                Preview submitted data
              </Button> */}
                  <div
                    style={{ width: "100%" }}
                    className=" justify-content-center pt-3 mt-4"
                  >
                    <Link to="" className="button-link">
                      <button
                        style={{ width: "60%" }}
                        className="button new-btn"
                      >
                        <span className="button-content">
                          Preview submitted data
                        </span>
                      </button>
                    </Link>

                    {/* <Link to="/user-dashboard" className="button-link">
                  <button className="button">
                    <span className="button-content">View Dashboard</span>
                  </button>
                </Link> */}
                  </div>
                </div>
                <div className="col-md-4">
                  {/* <div className="card">
                <Link
                  to="/choose-variables-page"
                  className="card-body text-center"
                >
                  <h5 className="card-title">Choose variables</h5>
                </Link>
              </div> */}
                  <div
                    style={{ width: "100%" }}
                    className=" justify-content-center "
                  >
                    <Link to="/choose-variables-page" className="button-link ">
                      <button className="button new-btn2">
                        <span className="button-content new-btn-content">
                          Choose variables
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
}

export default UserLandingPage
// ---------------------------------------------------

// import React, { useState } from "react";
// import logo from "./Logo.jpg";
// import "./UserLandingPage.css";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { MdOutlineFileUpload } from "react-icons/md";

// const UserLandingPage = () => {
//   const navigate = useNavigate();
//   const [selectedFilesTable1, setSelectedFilesTable1] = useState([]);
//   const [selectedFileTable2, setSelectedFileTable2] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleFileChange = (event, table) => {
//     switch (table) {
//       case "table1":
//         const filesTable1 = Array.from(event.target.files);
//         setSelectedFilesTable1(filesTable1);
//         break;
//       case "table2":
//         const fileTable2 = event.target.files[0];
//         setSelectedFileTable2(fileTable2);
//         break;
//       default:
//         console.error("Invalid table selection");
//     }
//   };

//   const handleSubmit = async (table) => {
//     let formData = new FormData();
//     let selectedFiles;

//     switch (table) {
//       case "table1":
//         selectedFiles = selectedFilesTable1;
//         if (!selectedFiles.length) {
//           alert("Please select files to upload for Table 1.");
//           return;
//         }
//         for (let i = 0; i < selectedFiles.length; i++) {
//           formData.append("files", selectedFiles[i]);
//         }
//         break;
//       case "table2":
//         if (!selectedFileTable2) {
//           alert("Please select a file to upload for Table 2.");
//           return;
//         }
//         formData.append("file", selectedFileTable2);
//         break;
//       default:
//         console.error("Invalid table selection");
//         return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://testsignuplogin.onrender.com/login/upload/1",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log("Files uploaded successfully:", response.data.files);
//         toast.success(`Data Added successful for ${table}!`);
//         table === "table1"
//           ? setSelectedFilesTable1([])
//           : setSelectedFileTable2(null);
//       } else {
//         console.error("Upload failed:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error uploading files:", error.message);
//       if (error.response) {
//         console.error("Server responded with:", error.response.data);
//       }
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div className="navbar-logo">
//           <div className="d-flex justify-content-between">
//             <div className="w-50 remove-logo">
//               <img src={logo} alt="" />
//             </div>
//             <div className="d-flex justify-content-evenly right-side-main-div">
//               <div className="right-side-navbar-first-div">
//                 <h4>User Center</h4>
//               </div>
//               <div
//                 className="right-side-navbar-second-div"
//                 data-bs-toggle="modal"
//                 data-bs-target="#logout-modal"
//               >
//                 <h3>VJ</h3>
//               </div>
//             </div>
//           </div>
//           <div className="navy-strip"></div>
//           <div className="gradient-strip"></div>
//         </div>
//       </nav>

//       <div className="landing-page-main-div">
//         <div className="d-flex justify-content-center pt-3">
//           <Link to="" className="arrow-shape">
//             Input Data
//           </Link>

//           <Link
//             to="/user-dashboard"
//             className="arrow-shape space-btw text-white"
//           >
//             <Link to="/user-dashboard" className="text-white">
//               View Dashboard
//             </Link>
//           </Link>
//         </div>

//         <div className="container mt-5">
//           <div className="row">
//             <div className="col-md-4">
//               <div className="card py-4">
//                 <div className="card-body text-center ">
//                   <h5 className="card-title">Upload 'Table 1'</h5>
//                   <MdOutlineFileUpload size={50} color="green" />
//                 </div>
//                 <input
//                   type="file"
//                   id="fileInputTable1"
//                   accept=".xls,.xlsx,.xlsm,.xlsb"
//                   multiple
//                   onChange={(e) => handleFileChange(e, "table1")}
//                   style={{ display: "none" }}
//                 />
//                 <Button
//                   style={{ backgroundColor: "#223244" }}
//                   variant=""
//                   className="px-5 py-2 w-50 m-auto text-white"
//                   onClick={() =>
//                     document.getElementById("fileInputTable1").click()
//                   }
//                 >
//                   Browse
//                 </Button>
//               </div>
//               <p className="card-text text-white mt-3">
//                 You have selected {selectedFilesTable1.length} file(s) for Table
//                 1
//               </p>
//               <Button
//                 className="btn full-width-button py-2 mt-5"
//                 onClick={() => handleSubmit("table1")}
//               >
//                 Submit Table 1 Data
//               </Button>
//             </div>
//             <div className="col-md-4">
//               <div className="card py-4">
//                 <div className="card-body text-center">
//                   <h5 className="card-title">Upload 'Table 2'</h5>
//                   <MdOutlineFileUpload size={50} color="green" />
//                 </div>
//                 <input
//                   type="file"
//                   id="fileInputTable2"
//                   accept=".xls,.xlsx,.xlsm,.xlsb"
//                   onChange={(e) => handleFileChange(e, "table2")}
//                   style={{ display: "none" }}
//                 />
//                 <Button
//                   style={{ backgroundColor: "#223244" }}
//                   variant=""
//                   className="px-5 py-2 w-50 m-auto text-white"
//                   onClick={() =>
//                     document.getElementById("fileInputTable2").click()
//                   }
//                 >
//                   Browse
//                 </Button>
//               </div>
//               <p className="card-text text-white mt-3">
//                 {selectedFileTable2
//                   ? `Selected file: ${selectedFileTable2.name}`
//                   : "No file selected for Table 2"}
//               </p>
//               <Button
//                 className="btn full-width-button py-2 mt-5"
//                 onClick={() => handleSubmit("table2")}
//               >
//                 Submit Table 2 Data
//               </Button>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <Link
//                   to="/choose-variables-page"
//                   className="card-body text-center"
//                 >
//                   <h5 className="card-title">Choose variables</h5>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Logout Modal */}
//       <div>
//         <div
//           className="modal fade"
//           id="logout-modal"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex={-1}
//           aria-labelledby="staticBackdropLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                   Are you sure you want to log out?
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 />
//               </div>
//               <div className="modal-footer justify-content-center">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   data-bs-dismiss="modal"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserLandingPage;