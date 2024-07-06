import React, { useState, useEffect } from "react";
import logo from "./Logo.png";
import "./UserLandingPage.css";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import file_1 from "./file-1.svg";
import file_2 from "./file-2.svg";
import file_3 from "./file-3.svg";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import UserSidebar from "./UserSidebar";


const UserLandingPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [excelColumns, setExcelColumns] = useState([]);
  const [backendColumns] = useState([
    "Text 1",
    "Text 2",
    "Text 3",
    "Text 4",
    "Text 5",
    "Text 6",
    "Text 7",
    "Text 8",
    "Text 9",
    "Text 10",
    "Text 11",
    "Text 12",
    "Text 13",
    "Text 14",
    "Text 15",
    "Numeric 1",
    "Numeric 2",
    "Numeric 3",
    "Numeric 4",
    "Numeric 5",
    "Numeric 6",
    "Numeric 7",
    "Numeric 8",
    "Numeric 9",
    "Numeric 10",
    "Numeric 11",
    "Numeric 12",
    "Spare Text 1",
    "Spare Text 2",
    "Spare Numeric 1",
    "Spare Numeric 2",
  ]);
  const [columnMapping, setColumnMapping] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [jsonData2, setJsonData2] = useState([]);
  const [showMapping, setShowMapping] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    selectedFiles.forEach(handleExcelColumns);
  };

   const handleFileChange2 = (event) => {
     const selectedFiles = Array.from(event.target.files);
     setFiles2(selectedFiles);
     selectedFiles.forEach(handleExcelColumns2);
   };

  const handleExcelColumns = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length > 0) {
        setExcelColumns((prev) => [...prev, ...jsonData[0]]);
        setJsonData((prev) => [
          ...prev,
          ...XLSX.utils.sheet_to_json(worksheet),
        ]);
      }
    };
    reader.readAsArrayBuffer(file);
  };


  const handleExcelColumns2 = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length > 0) {
        // setExcelColumns2((prev) => [...prev, ...jsonData[0]]);
        setJsonData2((prev) => [
          ...prev,
          ...XLSX.utils.sheet_to_json(worksheet),
        ]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

 useEffect(() => {
   const checkAndSubmitFiles = async () => {
     if (excelColumns.length > 0) {
       const allColumnsMatch = backendColumns.every((col) =>
         excelColumns.includes(col)
       );
       console.log(allColumnsMatch);

       switch (true) {
         case allColumnsMatch:
           await handleSubmit();
           setShowMapping(false);
           break;

         case !allColumnsMatch:
           toast.info("Columns do not match. Please map the columns.");
           setShowMapping(true);
           break;

         default:
           // This case will never be reached in the current logic,
           // but it's good practice to include it for completeness
           console.log("Unexpected condition in column matching");
       }
     }
   };

   checkAndSubmitFiles();
 }, [excelColumns]);

  const handleColumnMapping = (excelColumn, backendColumn) => {
    setColumnMapping((prev) => ({ ...prev, [excelColumn]: backendColumn }));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      for (const file of files) {
        let dataToUpload = jsonData;

        if (Object.keys(columnMapping).length > 0) {
          dataToUpload = jsonData.map((row) => {
            const newRow = {};
            Object.entries(row).forEach(([excelCol, value]) => {
              const backendCol = columnMapping[excelCol] || excelCol;
              newRow[backendCol] = value;
            });
            return newRow;
          });
        }

        const response = await axios.post(
          "https://testsignuplogin.onrender.com/login/upload/1",
          dataToUpload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("File uploaded successfully:", response.data);
          toast.success("Data added successfully!");
        } else {
          console.error("Upload failed:", response.data.message);
          toast.error("Upload failed. Please try again.");
        }
      }

      setFiles([]);
      setExcelColumns([]);
      setColumnMapping({});
      setJsonData([]);
      setShowMapping(false);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      toast.error("Error uploading file. Please try again.");
    }
  };

  const handleSubmit2 = async () => {
    console.log("table 2")
    if (files2.length === 0) {
      toast.error("Please select a file to upload for Table 2.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      for (const file of files2) {
        let dataToUpload = jsonData2;

        const response = await axios.post(
          "https://testsignuplogin.onrender.com/login/upload/2", // Changed to /2 for Table 2
          dataToUpload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("File uploaded successfully for Table 2:", response.data);
          toast.success("Data added successfully for Table 2!");
        } else {
          console.error("Upload failed for Table 2:", response.data.message);
          toast.error("Upload failed for Table 2. Please try again.");
        }
      }

      setFiles2([]);
     
     
      setJsonData2([]);
 
    } catch (error) {
      console.error("Error uploading file for Table 2:", error.message);
      toast.error("Error uploading file for Table 2. Please try again.");
    }
  };




  return (
    <>
      <div className="d-flex">
        <UserSidebar />
        <div className="flex-grow-1">
          <UserNavbar />
          <div className="landing-page-main-div">
            <div className="container">
              <div className="row py-5 container">
                <div className="col-md-4">
                  <h5
                    className="card-title text-center"
                    style={{ color: "goldenrod" }}
                  >
                    Table 1
                  </h5>
                  <hr
                    style={{
                      color: "goldenrod",
                      fontWeight: "bold",
                      borderTop: "3px solid goldenrod",
                    }}
                  />
                  <p className="text-white text-center fst-italic">
                    Select supplier files
                  </p>
                  <div className="card py-4 shadow-for-card">
                    <div className="card-body text-center">
                      <img src={file_1} alt="" />
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      accept=".xls,.xlsx,.xlsm,.xlsb"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant=""
                      className="px-5 py-2 m-auto text-black fst-italic"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Browse Your File
                    </Button>
                  </div>
                  <p className="text-white mt-2">
                    {files.length > 0
                      ? `${files.length} files selected`
                      : "No files selected"}
                  </p>
                  <div
                    style={{ width: "100%" }}
                    className="justify-content-center pt-3 mt-4"
                  >
                    <Button
                      style={{ width: "60%" }}
                      className="button new-btn2"
                      onClick={handleSubmit}
                      disabled={showMapping}
                    >
                      <span className="button-content">Submit Data</span>
                    </Button>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5
                    className="card-title text-center"
                    style={{ color: "goldenrod" }}
                  >
                    Table 2
                  </h5>
                  <hr
                    style={{
                      color: "goldenrod",
                      fontWeight: "bold",
                      borderTop: "3px solid goldenrod",
                    }}
                  />
                  <p className="text-white text-center fst-italic">
                    Select supplier files
                  </p>
                  <div className="card py-4 shadow-for-card">
                    <div className="card-body text-center">
                      <img src={file_2} alt="" />
                    </div>
                    <input
                      type="file"
                      id="fileInput2"
                      accept=".xls,.xlsx,.xlsm,.xlsb"
                      multiple
                      onChange={handleFileChange2}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant=""
                      className="px-5 py-2 m-auto text-black fst-italic"
                      onClick={() =>
                        document.getElementById("fileInput2").click()
                      }
                    >
                      Browse Your File
                    </Button>
                  </div>
                  <p className="text-white mt-2">
                    {files2.length > 0
                      ? `${files2.length} files selected`
                      : "No files selected"}
                  </p>
                  <div
                    style={{ width: "100%" }}
                    className="justify-content-center pt-3 mt-4"
                  >
                    <Button
                      style={{ width: "60%" }}
                      className="button new-btn2"
                      onClick={handleSubmit2}
                    >
                      <span className="button-content">Submit Data</span>
                    </Button>
                  </div>
                </div>

                {/* Table 3 */}
                <div className="col-md-4">
                  <h5
                    className="card-title text-center"
                    style={{ color: "goldenrod" }}
                  >
                    Table 3
                  </h5>
                  <hr
                    style={{
                      color: "goldenrod",
                      fontWeight: "bold",
                      borderTop: "3px solid goldenrod",
                    }}
                  />
                  <p className="text-white text-center fst-italic">
                    Select supplier files
                  </p>
                  <div className="card py-4 shadow-for-card">
                    <div className="card-body text-center">
                      <img src={file_3} alt="" />
                    </div>
                    <input
                      type="file"
                      id="fileInput3"
                      accept=".xls,.xlsx,.xlsm,.xlsb"
                      multiple
                      // onChange={handleFileChange3}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant=""
                      className="px-5 py-2 m-auto text-black fst-italic"
                      onClick={() =>
                        document.getElementById("fileInput3").click()
                      }
                    >
                      Browse Your File
                    </Button>
                  </div>
                  <p className="text-white mt-2">
                    {files3.length > 0
                      ? `${files3.length} files selected`
                      : "No files selected"}
                  </p>
                  <div
                    style={{ width: "100%" }}
                    className="justify-content-center pt-3 mt-4"
                  >
                    <Button
                      style={{ width: "60%" }}
                      className="button new-btn2"
                      // onClick={handleSubmit3}
                      // disabled={showMapping3}
                    >
                      <span className="button-content">Submit Data</span>
                    </Button>
                  </div>
                </div>

                {/* Additional tables code can be similarly updated for multiple file uploads */}
                {/* Mapping UI remains the same */}
                {showMapping && (
                  <div className="col-md-8 h-50">
                    <h5
                      className="card-title text-center"
                      style={{ color: "goldenrod" }}
                    >
                      Map Columns
                    </h5>
                    <hr
                      style={{
                        color: "goldenrod",
                        fontWeight: "bold",
                        borderTop: "3px solid goldenrod",
                      }}
                    />
                    <div
                      className="card py-4 shadow-for-card"
                      style={{ height: "400px", overflowY: "auto" }}
                    >
                      <div className="card-body">
                        {excelColumns.map((excelCol) => (
                          <div key={excelCol} className="mb-3">
                            <label className="text-black">{excelCol}: </label>
                            <select
                              className="form-select"
                              value={columnMapping[excelCol] || ""}
                              onChange={(e) =>
                                handleColumnMapping(excelCol, e.target.value)
                              }
                            >
                              <option value="">Select Backend Column</option>
                              {backendColumns.map((backendCol) => (
                                <option key={backendCol} value={backendCol}>
                                  {backendCol}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                        <Button
                          className="btn btn-primary mt-3"
                          onClick={() => {
                            setShowMapping(false);
                            alert("Please submit the file");
                          }}
                        >
                          Confirm Mapping
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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
    </>
  );
};

export default UserLandingPage;
// ----------------------------------------------------------
// import React, { useState } from "react";
// import logo from "./Logo.png";
// import "./UserLandingPage.css";
// import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
// import { Link, useNavigate, } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import { FaGear } from "react-icons/fa6";
// import { IoIosLogOut } from "react-icons/io";
// import axios from "axios";
// import {
//   CDBSidebar,
//   CDBSidebarHeader,
//   CDBSidebarMenuItem,
//   CDBSidebarContent,
//   CDBSidebarMenu,
// } from "cdbreact";
// import Logo from "./Logo.png";
// import { MdAdd } from "react-icons/md";
// import UserNavbar from "./UserNavbar";
// import { PiFilesFill } from "react-icons/pi";
// import { TfiViewListAlt } from "react-icons/tfi";
// import { FcTodoList } from "react-icons/fc";
// import file_1 from "./file-1.svg";
// import file_2 from "./file-2.svg";
// import file_3 from "./file-3.svg";
// import { toast } from "react-toastify";

// const Sidebar = () => {
//   return (
//     <CDBSidebar textColor="#333" backgroundColor="#ffffff">
//       <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
//         <div
//           className="container"
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <img
//             src={Logo}
//             alt=""
//             style={{ width: "100%", marginTop: "-20px", marginLeft: "-30px" }}
//           />
//           {/* <h6 className="ms-2">Resourcing Acumen</h6> */}
//         </div>
//       </CDBSidebarHeader>
//       <CDBSidebarContent>
//         <CDBSidebarMenu>
//           <CDBSidebarMenuItem icon="th-large">
//             <Link to="/user-dashboard">Dashboard</Link>
//           </CDBSidebarMenuItem>
//           {/* <CDBSidebarMenuItem icon="fa-solid fa-upload">
//             <Link to="/user-upload-files">Upload Data</Link>
//           </CDBSidebarMenuItem> */}

//           <CDBSidebarMenuItem icon="fa-solid fa-upload">
//             <Link to="/user-landing-page">Input Data</Link>
//           </CDBSidebarMenuItem>
//           {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
//             <Link to="/user-power-bi-data">View Data</Link>
//           </CDBSidebarMenuItem> */}

//           <CDBSidebarMenuItem icon="fa-solid fa-server">
//             <Link to="/user-uploaded-data">Data</Link>
//           </CDBSidebarMenuItem>
//           {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
//             <Link to="/users-column-mapping">Column Mapping</Link>
//           </CDBSidebarMenuItem> */}

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

// const UserLandingPage = () => {
//   const navigate = useNavigate();
//   const [selectedFilesTable1, setSelectedFilesTable1] = useState([]);
//   const [selectedFileTable2, setSelectedFileTable2] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleFileChange = (event, table) => {
//     if (table === "table1") {
//       const filesTable1 = Array.from(event.target.files);
//       setSelectedFilesTable1(filesTable1);
//     } else if (table === "table2") {
//       const fileTable2 = event.target.files[0];
//       setSelectedFileTable2(fileTable2);
//     }
//   };

//   const handleSubmit = async (table) => {
//     let formData = new FormData();
//     let selectedFiles;

//     if (table === "table1") {
//       selectedFiles = selectedFilesTable1;
//       if (!selectedFiles.length) {
//         alert("Please select files to upload for Table 1.");
//         return;
//       }
//       for (let i = 0; i < selectedFiles.length; i++) {
//         formData.append("files", selectedFiles[i]);
//       }
//     } else if (table === "table2") {
//       if (!selectedFileTable2) {
//         alert("Please select a file to upload for Table 2.");
//         return;
//       }
//       formData.append("file", selectedFileTable2);
//     }

//     try {
//       console.log("upload");
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
//       <div className="d-flex">
//         <Sidebar />
//         <div className="flex-grow-1">
//           <UserNavbar />
//           <div className="landing-page-main-div">
//             <div className="container">
//               <div className="row py-5 container">
//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 1
//                   </h5>
//                   <hr
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Select supplier files
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center">
//                       <img src={file_1} alt="" />
//                     </div>
//                     <input
//                       type="file"
//                       id="fileInputTable1"
//                       accept=".xls,.xlsx,.xlsm,.xlsb"
//                       multiple
//                       onChange={(e) => handleFileChange(e, "table1")}
//                       style={{ display: "none" }}
//                     />
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInputTable1").click()
//                       }
//                     >
//                       Browse Your Files
//                     </Button>
//                   </div>
//                   <p className="text-white mt-2">
//                     Selected {selectedFilesTable1.length} file(s) for Table 1
//                   </p>
//                   <div
//                     style={{ width: "100%" }}
//                     className="justify-content-center pt-3 mt-4"
//                   >
//                     <Button
//                       style={{ width: "60%" }}
//                       className="button new-btn2"
//                       onClick={() => handleSubmit("table1")}
//                     >
//                       <span className="button-content">
//                         Submit Table 1 Data
//                       </span>
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 2
//                   </h5>
//                   <hr
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Select table 2 files
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center ">
//                       <img src={file_2} alt="" />
//                     </div>
//                     <input
//                       type="file"
//                       id="fileInputTable2"
//                       accept=".xls,.xlsx,.xlsm,.xlsb"
//                       onChange={(e) => handleFileChange(e, "table2")}
//                       style={{ display: "none" }}
//                     />
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInputTable2").click()
//                       }
//                     >
//                       Browse Your Files
//                     </Button>
//                   </div>
//                   <p className="text-white mt-2">
//                     {selectedFileTable2
//                       ? `Selected file: ${selectedFileTable2.name}`
//                       : "No file selected for Table 2"}
//                   </p>
//                   <div
//                     style={{ width: "100%" }}
//                     className="justify-content-center pt-3 mt-4"
//                   >
//                     <Button
//                       style={{ width: "60%" }}
//                       className="button new-btn2"
//                       onClick={() => handleSubmit("table2")}
//                     >
//                       <span className="button-content">
//                         Submit Table 2 Data
//                       </span>
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 3
//                   </h5>
//                   <hr
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Enter Variables
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center ">
//                       <img src={file_3} alt="" height={95} />
//                     </div>
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInput").click()
//                       }
//                     >
//                       Enter Variables
//                     </Button>
//                   </div>
//                   <p className="text-white mt-2">
//                     No file(s) selected for Table 3
//                   </p>
//                   <div
//                     style={{ width: "100%" }}
//                     className="justify-content-center center-edit pt-3 mt-4"
//                   >
//                     <Link to="" className="button-link ">
//                       <button
//                         style={{ width: "60%" }}
//                         className="button new-btn2"
//                       >
//                         <span className="button-content">See Files</span>
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
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
//                   onClick={() => handleLogout()}
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

// -------------------------------------------------------------------------

// const UserLandingPage = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Clear token from local storage
//     localStorage.removeItem("token");

//     navigate("/");
//   };
//   return (
//     <>
//       <div className="d-flex">
//         <Sidebar />
//         <div className="flex-grow-1">
          
//           <UserNavbar />

//           <div className="landing-page-main-div">
          

//             <div className="container">
//               <div className="row py-5 container">
//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 1
//                   </h5>
//                   <hr
//                     classNa
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Select supplier files
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center">
//                       <i>
//                         {/* <PiFilesFill size={100} color="#90e0ef" /> */}
//                         <img src={file_1} alt="" />
//                       </i>
//                     </div> 
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInput").click()
//                       }
//                     >
//                       Browse Your Files
//                     </Button>
//                   </div>

//                   {/* <Button className="btn full-width-button py-2 mt-5 button">
//                 Preview submitted data
//               </Button> */}
//                   <div
//                     style={{ width: "100%" }}
//                     className=" justify-content-center pt-3 mt-4"
//                   >
//                     <Link to="" className="button-link ">
//                       <button
//                         style={{ width: "60%" }}
//                         className="button new-btn2"
//                       >
//                         <span className="button-content">See Files</span>
//                       </button>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 2
//                   </h5>
//                   <hr
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Select table 2 files
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center ">
//                       <i>
//                         {/* <PiFilesFill size={100} color="#bde0fe" /> */}
//                         <img src={file_2} alt="" />
//                       </i>
//                     </div>
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInput").click()
//                       }
//                     >
//                       Browse Your Files
//                     </Button>
//                   </div>

//                   {/* <Button className="btn full-width-button py-2 mt-5 button">
//                 Preview submitted data
//               </Button> */}
//                   <div
//                     style={{ width: "100%" }}
//                     className=" justify-content-center pt-3 mt-4"
//                   >
//                     <Link to="" className="button-link ">
//                       <button
//                         style={{ width: "60%" }}
//                         className="button new-btn2"
//                       >
//                         <span className="button-content">See Files</span>
//                       </button>
//                     </Link>

//                     {/* <Link to="/user-dashboard" className="button-link">
//                   <button className="button">
//                     <span className="button-content">View Dashboard</span>
//                   </button>
//                 </Link> */}
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <h5
//                     className="card-title text-center"
//                     style={{ color: "goldenrod" }}
//                   >
//                     Table 3
//                   </h5>
//                   <hr
//                     style={{
//                       color: "goldenrod",
//                       fontWeight: "bold",
//                       borderTop: "3px solid goldenrod",
//                     }}
//                   />
//                   <p className="text-white text-center fst-italic">
//                     Enter Variables
//                   </p>
//                   <div className="card py-4 shadow-for-card">
//                     <div className="card-body text-center ">
//                       <i>
//                         {/* <FcTodoList size={100} /> */}
//                         <img src={file_3} alt="" height={95} />
//                       </i>
//                     </div>
//                     <Button
//                       variant=""
//                       className="px-5 py-2 m-auto text-black fst-italic"
//                       onClick={() =>
//                         document.getElementById("fileInput").click()
//                       }
//                     >
//                       Enter Variables
//                     </Button>
//                   </div>

//                   {/* <Button className="btn full-width-button py-2 mt-5 button">
//                 Preview submitted data
//               </Button> */}
//                   <div
//                     style={{ width: "100%" }}
//                     className=" justify-content-center center-edit pt-3 mt-4"
//                   >
//                     <Link to="" className="button-link ">
//                       <button
//                         style={{ width: "60%" }}
//                         className="button new-btn2"
//                       >
//                         <span className="button-content">See Files</span>
//                       </button>
//                     </Link>

//                     {/* <Link to="/user-dashboard" className="button-link">
//                   <button className="button">
//                     <span className="button-content">View Dashboard</span>
//                   </button>
//                 </Link> */}
//                   </div>
//                 </div>
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

// export default UserLandingPage;
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
