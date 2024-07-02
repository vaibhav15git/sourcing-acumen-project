// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UploadFiles.css";
// import { MdOutlineFileUpload } from "react-icons/md";

// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";

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
//             <Link to="/upload-files">Upload Data</Link>
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

// const UploadFiles = () => {
//   const [files, setFiles] = useState([]);

//   // Load files metadata from localStorage when the component mounts
//   useEffect(() => {
//     const storedFiles = localStorage.getItem("uploadedFiles");
//     if (storedFiles) {
//       setFiles(JSON.parse(storedFiles));
//     }
//   }, []);

//   // Save files metadata to localStorage whenever the files array changes
//   useEffect(() => {
//     localStorage.setItem("uploadedFiles", JSON.stringify(files));
//   }, [files]);

//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files).map((file) => ({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       lastModified: file.lastModified,
//     }));
//     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1">
//         <Container fluid className="p-4 mt-5">
//           <Row className="justify-content-center">
//             <Col
//               md={4}
//               className="d-flex align-items-center justify-content-center"
//             >
//               <div className="upload-area text-center p-4 border rounded bg-light">
//                 <input
//                   type="file"
//                   id="fileInput"
//                   multiple
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="fileInput" className="d-block mb-3">
//                   <div className="upload-icon mb-2">
//                     <MdOutlineFileUpload size={100} color="green" />
//                   </div>
//                   <p className="drag-drop-text">Drag and Drop file or</p>
//                 </label>
//                 <Button
//                   variant="info"
//                   className="px-5 py-2"
//                   onClick={() => document.getElementById("fileInput").click()}
//                 >
//                   Browse
//                 </Button>
//               </div>
//             </Col>
//             <Col md={8} className="pt-4 pt-md-0">
//               <ListGroup>
//                 {files.map((file, index) => (
//                   <ListGroup.Item key={index}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <strong>{file.name}</strong>
//                         <div className="text-muted">
//                           {(file.size / 1024 / 1024).toFixed(2)} MB
//                         </div>
//                       </div>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => {
//                           setFiles(files.filter((_, i) => i !== index));
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default UploadFiles;

// ----------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UploadFiles.css";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";

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
//             <Link to="/upload-files">Upload Data</Link>
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
// const UploadFiles = () => {
//   // Initialize files state with stored files from localStorage
//   const [files, setFiles] = useState(() => {
//     const storedFiles = localStorage.getItem("uploadedFiles");
//     return storedFiles ? JSON.parse(storedFiles) : [];
//   });

//   // Save files metadata to localStorage whenever the files array changes
//   useEffect(() => {
//     localStorage.setItem("uploadedFiles", JSON.stringify(files));
//   }, [files]);

//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files).map((file) => ({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       lastModified: file.lastModified,
//     }));
//     // Replace existing files with new files
//     setFiles(newFiles);
//   };

//   return (
//     <div className="d-flex">
//       {/* Sidebar component */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-grow-1">
//         <Container fluid className="p-4 mt-5">
//           <Row className="justify-content-center">
//             <Col
//               md={4}
//               className="d-flex align-items-center justify-content-center"
//              >
//               <div className="upload-area text-center p-4 border rounded bg-light">
//                 <input
//                   type="file"
//                   id="fileInput"
//                   multiple
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="fileInput" className="d-block mb-3">
//                   <div className="upload-icon mb-2 mt-5">
//                     <MdOutlineFileUpload size={100} color="green" />
//                   </div>
//                   <p className="drag-drop-text">Drag and Drop file or</p>
//                 </label>
//                 <Button
//                   variant="info"
//                   className="px-5 py-2"
//                   onClick={() => document.getElementById("fileInput").click()}
//                 >
//                   Browse
//                 </Button>
//               </div>
//             </Col>
//             <Col md={8} className="pt-4 pt-md-0">
//               <ListGroup>
//                 {/* Display uploaded files */}
//                 {files.map((file, index) => (
//                   <ListGroup.Item key={index}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <strong>{file.name}</strong>
//                         <div className="text-muted">
//                           {(file.size / 1024 / 1024).toFixed(2)} MB
//                         </div>
//                       </div>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => {
//                           // Remove file from the state
//                           setFiles(files.filter((_, i) => i !== index));
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default UploadFiles;

// --------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UploadFiles.css";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";

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
//           <CDBSidebarMenuItem icon="fa-solid fa-upload">
//             <Link to="/upload-files">Upload Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-database">
//             <Link to="/power-bi-data">View Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-user-tie">
//             <Link to="/admin-user-list">Admin</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-backward">
//             <button
//               type="button"
//               className="btn btn-link p-0 text-decoration-none text-black"
//               data-bs-toggle="modal"
//               data-bs-target="#logout-modal"
//             >
//               Logout
//             </button>
//           </CDBSidebarMenuItem>
//         </CDBSidebarMenu>
//       </CDBSidebarContent>
//     </CDBSidebar>
//   );
// };

// const UploadFiles = () => {
//   const navigate = useNavigate();
//   // Initialize files state with stored files from localStorage
//   const [files, setFiles] = useState(() => {
//     const storedFiles = localStorage.getItem("uploadedFiles");
//     return storedFiles ? JSON.parse(storedFiles) : [];
//   });

//   // Save files metadata to localStorage whenever the files array changes
//   useEffect(() => {
//     localStorage.setItem("uploadedFiles", JSON.stringify(files));
//   }, [files]);

//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files).map((file) => ({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       lastModified: file.lastModified,
//     }));
//     // Append new files to the existing files array
//     setFiles([...files, ...newFiles]);
//   };

//   const handleRemoveFile = (index) => {
//     // Remove file from the state
//     const updatedFiles = files.filter((_, i) => i !== index);
//     setFiles(updatedFiles);
//   };

//   const handleLogout = () => {
//     // Clear token from local storage
//     localStorage.removeItem("token");

//     navigate("/");
//   };

//   return (
//     <>
//       <div className="d-flex">
//         {/* Sidebar component */}
//         <Sidebar />

//         {/* Main content area */}
//         <div className="flex-grow-1">
//           <Container fluid className="p-4 mt-5">
//             <Row className="justify-content-center">
//               <Col
//                 md={4}
//                 className="d-flex align-items-center justify-content-center"
//                 style={{ height: "60vh" }}
//               >
//                 <div className="upload-area text-center p-4 border rounded bg-light h-100">
//                   <input
//                     type="file"
//                     id="fileInput"
//                     accept=".xls,.xlsx,.xlsm,.xlsb"
//                     multiple
//                     onChange={handleFileChange}
//                     style={{ display: "none", marginTop: "100px" }}
//                   />
//                   <label htmlFor="fileInput" className="d-block mb-3">
//                     <div className="upload-icon mb-2">
//                       <MdOutlineFileUpload size={100} color="green" />
//                     </div>
//                     <p className="drag-drop-text">Drag and Drop file or</p>
//                   </label>
//                   <Button
//                     variant="info"
//                     className="px-5 py-2"
//                     onClick={() => document.getElementById("fileInput").click()}
//                   >
//                     Browse
//                   </Button>
//                 </div>
//               </Col>
//               <Col md={8} className="pt-4 pt-md-0 ">
//                 <ListGroup
//                   className=" overflow-y-scroll "
//                   style={{ height: "60vh", scrollbarWidth: "none" }}
//                 >
//                   {/* Display uploaded files */}
//                   {files.map((file, index) => (
//                     <ListGroup.Item key={index}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <strong>{file.name}</strong>
//                           <div className="text-muted">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </div>
//                         </div>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleRemoveFile(index)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Col>
//             </Row>
//           </Container>
//           <div className="float-end me-4">
//             <button className=" btn btn-info">Submit</button>
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
//                   className="btn btn-primary"
//                   data-bs-dismiss="modal"
//                   onClick={() => handleLogout()}
//                 >
//                   Log Out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Logout Modal */}
//     </>
//   );
// };

// export default UploadFiles;

// ---------------------------------------------------------------------------

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UploadFiles.css";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";
// import axios from "axios";

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
//           <CDBSidebarMenuItem icon="fa-solid fa-upload">
//             <Link to="/upload-files">Upload Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-database">
//             <Link to="/power-bi-data">View Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-user-tie">
//             <Link to="/admin-user-list">Admin</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-backward">
//             <button
//               type="button"
//               className="btn btn-link p-0 text-decoration-none text-black"
//               data-bs-toggle="modal"
//               data-bs-target="#logout-modal"
//             >
//               Logout
//             </button>
//           </CDBSidebarMenuItem>
//         </CDBSidebarMenu>
//       </CDBSidebarContent>
//     </CDBSidebar>
//   );
// };

// const UploadFiles = () => {

//   return (
//     <>
//       <div className="d-flex">
//         <Sidebar />
//         <div className="flex-grow-1">
//           <Container fluid className="p-4 mt-5">
//             <Row className="justify-content-center">
//               <Col
//                 md={4}
//                 className="d-flex align-items-center justify-content-center"
//                 style={{ height: "60vh" }}
//               >
//                 <div className="upload-area text-center p-4 border rounded bg-light h-100">
//                   <input
//                     type="file"
//                     id="fileInput"
//                     accept=".xls,.xlsx,.xlsm,.xlsb"
//                     multiple
//                     onChange={handleFileChange}
//                     style={{ display: "none", marginTop: "100px" }}
//                   />
//                   <label htmlFor="fileInput" className="d-block mb-3">
//                     <div className="upload-icon mb-2">
//                       <MdOutlineFileUpload size={100} color="green" />
//                     </div>
//                     <p className="drag-drop-text">Drag and Drop file or</p>
//                   </label>
//                   <Button
//                     variant="info"
//                     className="px-5 py-2"
//                     onClick={() => document.getElementById("fileInput").click()}
//                   >
//                     Browse
//                   </Button>
//                 </div>
//               </Col>
//               <Col md={8} className="pt-4 pt-md-0 ">
//                 <ListGroup
//                   className="overflow-y-scroll"
//                   style={{ height: "60vh", scrollbarWidth: "none" }}
//                 >
//                   {files.map((file, index) => (
//                     <ListGroup.Item key={index}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <strong>{file.name}</strong>
//                           <div className="text-muted">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </div>
//                         </div>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleRemoveFile(index)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Col>
//             </Row>
//           </Container>
//           <div className="float-end me-4">
//             <Button className="btn btn-info" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </div>
//         </div>
//       </div>
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
//                 <Button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="button"
//                   className="btn btn-primary"
//                   data-bs-dismiss="modal"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadFiles;

// -----------------------------------------------------------------------

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UploadFiles.css";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";
// import axios from "axios";
// import { toast } from "react-toastify";

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
//           <CDBSidebarMenuItem icon="fa-solid fa-upload">
//             <Link to="/upload-files">Upload Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-database">
//             <Link to="/power-bi-data">View Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-server">
//             <Link to="/data">Data</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-user-tie">
//             <Link to="/admin-user-list">Admin</Link>
//           </CDBSidebarMenuItem>
//           <CDBSidebarMenuItem icon="fa-solid fa-backward">
//             <button
//               type="button"
//               className="btn btn-link p-0 text-decoration-none text-black"
//               data-bs-toggle="modal"
//               data-bs-target="#logout-modal"
//             >
//               Logout
//             </button>
//           </CDBSidebarMenuItem>
//         </CDBSidebarMenu>
//       </CDBSidebarContent>
//     </CDBSidebar>
//   );
// };

// const UploadFiles = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     setSelectedFiles(event.target.files);
//   };

//   const handleRemoveFile = (index) => {
//     const newFiles = Array.from(selectedFiles);
//     newFiles.splice(index, 1);
//     setSelectedFiles(newFiles);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFiles.length) {
//       alert("Please select files to upload.");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("files", selectedFiles[i]);
//     }

//     try {
//       const token = localStorage.getItem("token");
//       console.log(token);
//       const response = await axios.post(
//         "https://testsignuplogin.onrender.com/login/upload",
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
//         toast.success("Data Added successful!");
//         navigate("/data");
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

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <>
//       <div className="d-flex">
//         <Sidebar />
//         <div className="flex-grow-1">
//           <Container fluid className="p-4 mt-5">
//             <Row className="justify-content-center">
//               <Col
//                 md={4}
//                 className="d-flex align-items-center justify-content-center"
//                 style={{ height: "60vh" }}
//               >
//                 <div className="upload-area text-center p-4 border rounded bg-light h-100">
//                   <input
//                     type="file"
//                     id="fileInput"
//                     accept=".xls,.xlsx,.xlsm,.xlsb"
//                     multiple
//                     onChange={handleFileChange}
//                     style={{ display: "none", marginTop: "100px" }}
//                   />
//                   <label htmlFor="fileInput" className="d-block mb-3">
//                     <div className="upload-icon mb-2">
//                       <MdOutlineFileUpload size={100} color="green" />
//                     </div>
//                     <p className="drag-drop-text">Drag and Drop file or</p>
//                   </label>
//                   <Button
//                     variant="info"
//                     className="px-5 py-2"
//                     onClick={() => document.getElementById("fileInput").click()}
//                   >
//                     Browse
//                   </Button>
//                 </div>
//               </Col>
//               <Col md={8} className="pt-4 pt-md-0">
//                 <ListGroup
//                   className="overflow-y-scroll"
//                   style={{ height: "60vh", scrollbarWidth: "none" }}
//                 >
//                   {Array.from(selectedFiles).map((file, index) => (
//                     <ListGroup.Item key={index}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <strong>{file.name}</strong>
//                           <div className="text-muted">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </div>
//                         </div>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleRemoveFile(index)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Col>
//             </Row>
//           </Container>
//           <div className="float-end me-4">
//             <Button className="btn btn-info" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </div>
//         </div>
//       </div>
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
//                 <Button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="button"
//                   className="btn btn-primary"
//                   data-bs-dismiss="modal"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadFiles;

// ------------------------------------------------------------------------
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UploadFiles.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
import axios from "axios";
import { toast } from "react-toastify";
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
            <Link to="/dashboard">Dashboard</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-upload">
            <Link to="/upload-files">Upload Data</Link>
          </CDBSidebarMenuItem> */}
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/power-bi-data">View Data</Link>
          </CDBSidebarMenuItem> */}
          <CDBSidebarMenuItem icon="fa-solid fa-server">
            <Link to="/data">Data</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="fa-solid fa-user-tie">
            <Link to="/admin-user-list">Admin</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/column-mapping">Column Mapping</Link>
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

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(event.target.files),
    ]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = Array.from(selectedFiles);
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        "https://testsignuplogin.onrender.com/login/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Files uploaded successfully:", response.data.files);
        toast.success("Data Added successful!");
        navigate("/data");
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error.message);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Container fluid className="p-4 mt-5">
            <Row className="justify-content-center">
              <Col
                md={4}
                className="d-flex align-items-center justify-content-center"
                style={{ height: "60vh" }}
              >
                <div className="upload-area text-center p-4 border rounded bg-light h-100">
                  <input
                    type="file"
                    id="fileInput"
                    accept=".xls,.xlsx,.xlsm,.xlsb"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none", marginTop: "100px" }}
                  />
                  <label htmlFor="fileInput" className="d-block mb-3">
                    <div className="upload-icon mb-2">
                      <MdOutlineFileUpload size={100} color="green" />
                    </div>
                    <p className="drag-drop-text">Drag and Drop file or</p>
                  </label>
                  <Button
                    variant="info"
                    className="px-5 py-2"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Browse
                  </Button>
                </div>
              </Col>
              <Col md={8} className="pt-4 pt-md-0">
                <ListGroup
                  className="overflow-y-scroll"
                  style={{ height: "60vh", scrollbarWidth: "none" }}
                >
                  {selectedFiles.map((file, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{file.name}</strong>
                          <div className="text-muted">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
          <div className="float-end me-4">
            <Button className="btn btn-info" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
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
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFiles;
