// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const NewExcelUploader = () => {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const [selectedFilesTable1, setSelectedFilesTable1] = useState([]);
//   const [selectedFileTable2, setSelectedFileTable2] = useState(null);

// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //   };

//   const handleFileChange = (event, table) => {
//     if (table === "table1") {
//       const filesTable1 = Array.from(event.target.files);
//       setSelectedFilesTable1(filesTable1);
//     } else if (table === "table2") {
//       const fileTable2 = event.target.files[0];
//       setSelectedFileTable2(fileTable2);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setUploadStatus("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.post(
//         "https://testsignuplogin.onrender.com/login/upload/1",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//              Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUploadStatus("File uploaded successfully");
//       console.log(response.data);
//     } catch (error) {
//       setUploadStatus("Error uploading file");
//       console.error("Error:", error);
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
//     <div>
//       <h2>Excel File Uploader</h2>
//       <input
//         type="file"
//         accept=".xls,.xlsx,.xlsm,.xlsb"
//         multiple
//         onChange={handleFileChange}
//       />
//       <button onClick={handleSubmit}>Upload</button>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default NewExcelUploader;

// import React, { useState } from "react";
// import axios from "axios";

// const NewExcelUploader = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setUploadStatus("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     const token = localStorage.getItem("token");

//     try {
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

//       setUploadStatus("File uploaded successfully!");
//       console.log("Server response:", response.data);
//     } catch (error) {
//       setUploadStatus("Error uploading file. Please try again.");
//       console.error("Upload error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Excel File Uploader</h2>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         accept=".xls,.xlsx,.xlsm,.xlsb"
//       />
//       <button onClick={handleUpload}>Upload</button>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default NewExcelUploader;

// import React, { useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";

// const NewExcelUploader = () => {
//   const [file, setFile] = useState(null);
//   const [excelColumns, setExcelColumns] = useState([]);
//   const [backendColumns, setBackendColumns] = useState([
//     "Text 1",
//     "Text 2",
//     "Text 3",
//     "Text 4",
//     "Text 5",
//     "Text 6",
//     "Text 7",
//     "Text 8",
//     "Text 9",
//     "Text 10",
//     "Text 11",
//     "Text 12",
//     "Text 13",
//     "Text 14",
//     "Text 15",
//     "Numeric 1",
//     "Numeric 2",
//     "Numeric 3",
//     "Numeric 4",
//     "Numeric 5",
//     "Numeric 6",
//     "Numeric 7",
//     "Numeric 8",
//     "Numeric 9",
//     "Numeric 10",
//     "Numeric 11",
//     "Numeric 12",
//     "Spare Text 1",
//     "Spare Text 2",
//     "Spare Numeric 1",
//     "Spare Numeric 2",
//   ]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     handleExcelColumns(e.target.files[0]);
//   };

//   const handleExcelColumns = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       if (jsonData.length > 0) {
//         setExcelColumns(jsonData[0]);
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     const url = "https://testsignuplogin.onrender.com/login/upload/1";
//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Assume we want to read the first sheet
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // Convert the sheet to JSON
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Log the data to the console
//       console.log(jsonData);

//       try {
//         // Retrieve the token from wherever you have stored it (e.g., localStorage)
//         const token = localStorage.getItem("token");

//         // Make the POST request using axios
//         const response = await axios.post(url, jsonData, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Adjust this based on your API's authentication method
//           },
//         });

//         console.log("Upload successful:", response.data);
//         alert("File uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Error uploading file. Please try again.");
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         accept=".xls,.xlsx,.xlsm,.xlsb"
//       />
//       <button onClick={handleUpload}>Upload</button>

//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>
//           <h3>Backend Columns:</h3>
//           <ul>
//             {backendColumns.map((column, index) => (
//               <li key={index}>{column}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3>Excel Columns:</h3>
//           <ul>
//             {excelColumns.map((column, index) => (
//               <li key={index}>{column}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewExcelUploader;
// -----------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const NewExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [excelColumns, setExcelColumns] = useState([]);
  const [backendColumns, setBackendColumns] = useState([
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
  const [showMapping, setShowMapping] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleExcelColumns(selectedFile);
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
        setExcelColumns(jsonData[0]);
        setJsonData(XLSX.utils.sheet_to_json(worksheet));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (excelColumns.length > 0) {
      const allColumnsMatch = backendColumns.every((col) =>
        excelColumns.includes(col)
      );
      if (!allColumnsMatch) {
        alert("Columns do not match. Please map the columns.");
        setShowMapping(true);
      } else {
        setShowMapping(false);
      }
    }
  }, [excelColumns]);

  const handleColumnMapping = (excelColumn, backendColumn) => {
    setColumnMapping((prev) => ({ ...prev, [excelColumn]: backendColumn }));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const url = "https://testsignuplogin.onrender.com/login/upload/1";

    try {
      const token = localStorage.getItem("token");
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

      const response = await axios.post(url, dataToUpload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Upload successful:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xls,.xlsx,.xlsm,.xlsb"
        multiple
      />
      <button onClick={handleUpload} disabled={showMapping}>
        Upload
      </button>

      {showMapping && (
        <div>
          <h3>Map Columns:</h3>
          {excelColumns.map((excelCol) => (
            <div key={excelCol}>
              <label>{excelCol}: </label>
              <select
                value={columnMapping[excelCol] || ""}
                onChange={(e) => handleColumnMapping(excelCol, e.target.value)}
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
          <button onClick={() => setShowMapping(false)}>Confirm Mapping</button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Backend Columns:</h3>
          <ul>
            {backendColumns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Excel Columns:</h3>
          <ul>
            {excelColumns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewExcelUploader;