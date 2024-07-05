// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const ExcelUploader = () => {
//   const [excelData, setExcelData] = useState([]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryString = event.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(data);
//     };

//     reader.readAsBinaryString(file);
//   };

//   return (
//     <div>
//       <h1>Excel File Uploader</h1>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

//       {excelData.length > 0 && (
//         <div>
//           <h2>Uploaded Data:</h2>
//           <table>
//             <thead>
//               <tr>
//                 {Object.keys(excelData[0]).map((key) => (
//                   <th key={key}>{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {excelData.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, i) => (
//                     <td key={i}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;

// ------------------------------------------------------------------------


// ----------------------------------------
// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// // Assume this is the list of column names from your backend
// const backendColumns = [
//   "Text 1",
//   "Text 2",
//   "Text 3",
//   "Text 4",
//   // ... add all your backend columns in order
// ];

// const ExcelUploader = () => {
//   const [excelData, setExcelData] = useState([]);

//   const processExcel = (file) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Assume we're working with the first sheet
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       // Get the Excel column names
//       const range = XLSX.utils.decode_range(sheet["!ref"]);
//       const excelColumns = [];
//       for (let C = range.s.c; C <= range.e.c; ++C) {
//         const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
//         excelColumns.push(cell ? cell.v : undefined);
//       }

//       // Convert sheet to JSON
//       let jsonData = XLSX.utils.sheet_to_json(sheet);

//       // Rename columns
//       jsonData = jsonData.map((row) => {
//         const newRow = {};
//         excelColumns.forEach((excelCol, index) => {
//           if (index < backendColumns.length) {
//             newRow[backendColumns[index]] = row[excelCol];
//           }
//         });
//         return newRow;
//       });

//       // Update state with processed data
//       setExcelData(jsonData);

//       // Send to backend
//       // sendToBackend(jsonData);
//       console.log(jsonData);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       processExcel(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//       {excelData.length > 0 && (
//         <div>
//           <h2>Processed Excel Data:</h2>
//           <pre>{JSON.stringify(excelData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;

// // function sendToBackend(data) {
// //   // Use your preferred method to send data to the backend
// //   // For example, using fetch:
// //   fetch("/api/upload", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(data),
// //   })
// //     .then((response) => response.json())
// //     .then((result) => console.log("Success:", result))
// //     .catch((error) => console.error("Error:", error));
// // }

// --------------------------------------------------------------------------

// import React, { useState, useRef } from "react";
// import * as XLSX from "xlsx";

// const ExcelUploader = () => {
//   const [backendColumns, setBackendColumns] = useState([
//     "Text 1",
//     "Text 2",
//     "Text 3",
//     "Text 4",
//   ]);
//   const [newColumns, setNewColumns] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showColumnMapping, setShowColumnMapping] = useState(false);
//   const [allColumnsMatched, setAllColumnsMatched] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [usedBackendColumns, setUsedBackendColumns] = useState([]);
//   const fileInputRef = useRef(null);

//   const processFiles = (files) => {
//     const newErrors = {};
//     let processedFiles = 0;
//     const allUploadedColumns = new Set();
//     const fileDataArray = [];
//     let allMatched = true;

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (data.length > 0) {
//           const uploadedColumns = data[0];
//           const unmatchedColumns = uploadedColumns.filter(
//             (col) => !backendColumns.includes(col)
//           );

//           if (unmatchedColumns.length > 0) {
//             newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
//               ", "
//             )}`;
//             allMatched = false;
//           }

//           fileDataArray.push({ name: file.name, data, workbook, sheetName });
//           uploadedColumns.forEach((col) => allUploadedColumns.add(col));
//         }

//         processedFiles++;
//         if (processedFiles === files.length) {
//           setErrors(newErrors);
//           setFilesData(fileDataArray);
//           const initialColumns = Array.from(allUploadedColumns).map((col) => {
//             const isMatched = backendColumns.includes(col);
//             if (isMatched) {
//               setUsedBackendColumns((prev) => [...prev, col]);
//             }
//             return {
//               name: col,
//               backendColumn: isMatched ? col : "",
//               isMatched: isMatched,
//             };
//           });
//           setNewColumns(initialColumns);
//           setShowColumnMapping(!allMatched);
//           setAllColumnsMatched(allMatched);
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   const handleFileUpload = () => {
//     if (fileInputRef.current.files.length > 0) {
//       const files = Array.from(fileInputRef.current.files);
//       setUsedBackendColumns([]);
//       processFiles(files);
//     }
//   };

//   const handleBackendColumnSelect = (index, selectedColumn) => {
//     const updatedColumns = [...newColumns];
//     const previousBackendColumn = updatedColumns[index].backendColumn;

//     // Remove the previously selected backend column from usedBackendColumns
//     if (previousBackendColumn) {
//       setUsedBackendColumns((prev) =>
//         prev.filter((col) => col !== previousBackendColumn)
//       );
//     }

//     updatedColumns[index].backendColumn = selectedColumn;
//     updatedColumns[index].isMatched = true;
//     setNewColumns(updatedColumns);

//     // Add the newly selected backend column to usedBackendColumns
//     if (selectedColumn) {
//       setUsedBackendColumns((prev) => [...prev, selectedColumn]);
//     }
//   };

//   const handleUpdateColumns = () => {
//     const updatedBackendColumns = Array.from(
//       new Set([
//         ...backendColumns,
//         ...newColumns.map((col) => col.backendColumn).filter(Boolean),
//       ])
//     );
//     setBackendColumns(updatedBackendColumns);
//     setShowColumnMapping(false);
//     setNewColumns([]);
//     setErrors({});
//     setAllColumnsMatched(true);
//     setUsedBackendColumns([]);
//     fileInputRef.current.value = null;
//   };

//   const handleUploadToBackend = () => {
//     alert("All columns matched! Ready to upload.");
//     // Here you would implement the actual upload logic
//     console.log("Files ready for upload:", filesData);
//   };

//   return (
//     <div>
//       <h1>Excel Column Manager</h1>
//       <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
//       <button onClick={handleFileUpload}>Upload Files</button>

//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h2>Errors:</h2>
//           <ul>
//             {Object.entries(errors).map(([fileName, error]) => (
//               <li key={fileName}>
//                 <strong>{fileName}:</strong> {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {allColumnsMatched && (
//         <div>
//           <h2>All columns matched successfully!</h2>
//           <button onClick={handleUploadToBackend}>Proceed with Upload</button>
//         </div>
//       )}

//       {showColumnMapping && (
//         <div>
//           <h2>Column Mapping:</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Excel Column</th>
//                 <th>Backend Column</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newColumns.map((col, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor: col.isMatched ? "white" : "yellow",
//                   }}
//                 >
//                   <td>{col.name}</td>
//                   <td>
//                     <select
//                       value={col.backendColumn}
//                       onChange={(e) =>
//                         handleBackendColumnSelect(index, e.target.value)
//                       }
//                     >
//                       <option value="">Select backend column</option>
//                       {backendColumns.map((backendCol) => (
//                         <option
//                           key={backendCol}
//                           value={backendCol}
//                           disabled={
//                             usedBackendColumns.includes(backendCol) &&
//                             backendCol !== col.backendColumn
//                           }
//                         >
//                           {backendCol}
//                         </option>
//                       ))}
//                       <option value={col.name}>Add as new column</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpdateColumns}>Update Columns List</button>
//         </div>
//       )}

     
//     </div>
//   );
// };

// export default ExcelUploader;
// ----------------------------------------------------

import axios from "axios";
import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
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
  const [newColumns, setNewColumns] = useState([]);
  const [errors, setErrors] = useState({});
  const [showColumnMapping, setShowColumnMapping] = useState(false);
  const [allColumnsMatched, setAllColumnsMatched] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [usedBackendColumns, setUsedBackendColumns] = useState([]);
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    const newErrors = {};
    let processedFiles = 0;
    const allUploadedColumns = new Set();
    const fileDataArray = [];
    let allMatched = true;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (data.length > 0) {
          const uploadedColumns = data[0];
          const unmatchedColumns = uploadedColumns.filter(
            (col) => !backendColumns.includes(col)
          );

          if (unmatchedColumns.length > 0) {
            newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
              ", "
            )}`;
            allMatched = false;
          }

          fileDataArray.push({ name: file.name, data, workbook, sheetName });
          uploadedColumns.forEach((col) => allUploadedColumns.add(col));
        }

        processedFiles++;
        if (processedFiles === files.length) {
          setErrors(newErrors);
          setFilesData(fileDataArray);

          if (allMatched) {
            // If all columns match, upload files directly
            uploadFilesToBackend(fileDataArray);
            console.log("lsl", uploadFilesToBackend, fileDataArray);
          } else {
            // If there are unmatched columns, show the column mapping interface
            const initialColumns = Array.from(allUploadedColumns).map((col) => {
              const isMatched = backendColumns.includes(col);
              if (isMatched) {
                setUsedBackendColumns((prev) => [...prev, col]);
              }
              return {
                name: col,
                backendColumn: isMatched ? col : "",
                isMatched: isMatched,
              };
            });
            setNewColumns(initialColumns);
            setShowColumnMapping(true);
          }

          setAllColumnsMatched(allMatched);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const handleFileUpload = () => {
    if (fileInputRef.current.files.length > 0) {
      const files = Array.from(fileInputRef.current.files);
      setUsedBackendColumns([]);
      processFiles(files);
    }
  };

  const handleBackendColumnSelect = (index, selectedColumn) => {
    const updatedColumns = [...newColumns];
    const previousBackendColumn = updatedColumns[index].backendColumn;

    if (previousBackendColumn) {
      setUsedBackendColumns((prev) =>
        prev.filter((col) => col !== previousBackendColumn)
      );
    }

    updatedColumns[index].backendColumn = selectedColumn;
    updatedColumns[index].isMatched = true;
    setNewColumns(updatedColumns);

    if (selectedColumn) {
      setUsedBackendColumns((prev) => [...prev, selectedColumn]);
    }
  };

  const handleUpdateColumns = () => {
    const updatedBackendColumns = Array.from(
      new Set([
        ...backendColumns,
        ...newColumns.map((col) => col.backendColumn).filter(Boolean),
      ])
    );
    setBackendColumns(updatedBackendColumns);
    updateExcelFiles();
  };

  const updateExcelFiles = () => {
    const updatedFilesData = filesData.map((fileData) => {
      const { data, workbook, sheetName } = fileData;
      const updatedHeader = newColumns.map(
        (col) => col.backendColumn || col.name
      );
      data[0] = updatedHeader; // Update the header row
      const updatedSheet = XLSX.utils.aoa_to_sheet(data);
      workbook.Sheets[sheetName] = updatedSheet;
      return { ...fileData, workbook };
    });

    uploadFilesToBackend(updatedFilesData);
  };

  const uploadFilesToBackend = async (filesToUpload) => {
    for (const fileData of filesToUpload) {
      const { workbook, name } = fileData;
      const updatedWorkbookArray = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
        type: "application/octet-stream",
      });

      const formData = new FormData();
      formData.append("file", updatedWorkbookBlob, name);

      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          "https://testsignuplogin.onrender.com/login/upload/1",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`File ${name} uploaded successfully:`, response);
      } catch (error) {
        console.error(`Error uploading file ${name}:`, error);
      }
    }

    // Reset state after upload
    setShowColumnMapping(false);
    setNewColumns([]);
    setErrors({});
    setAllColumnsMatched(true);
    setUsedBackendColumns([]);
    fileInputRef.current.value = null;
  };

  const handleUploadToBackend = () => {
    if (allColumnsMatched) {
      alert("All columns matched! Ready to upload.");
      updateExcelFiles();
    } else {
      alert("Please ensure all columns are matched before uploading.");
    }
  };

  return (
    <div>
      <h1>Excel Column Manager</h1>
      <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload Files</button>

      {Object.keys(errors).length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {Object.entries(errors).map(([fileName, error]) => (
              <li key={fileName}>
                <strong>{fileName}:</strong> {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showColumnMapping && (
        <div>
          <h2>Column Mapping:</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Excel Column</th>
                <th>Backend Column</th>
              </tr>
            </thead>
            <tbody>
              {newColumns.map((col, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: col.isMatched ? "white" : "yellow",
                  }}
                >
                  <td>{col.name}</td>
                  <td>
                    <select
                      value={col.backendColumn}
                      onChange={(e) =>
                        handleBackendColumnSelect(index, e.target.value)
                      }
                    >
                      <option value="">Select backend column</option>
                      {backendColumns.map((backendCol) => (
                        <option
                          key={backendCol}
                          value={backendCol}
                          disabled={
                            usedBackendColumns.includes(backendCol) &&
                            backendCol !== col.backendColumn
                          }
                        >
                          {backendCol}
                        </option>
                      ))}
                      <option value={col.name}>Add as new column</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleUpdateColumns}>Update Columns List</button>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
// -----------------------------------------------------

// import React, { useState, useRef } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const ExcelUploader = () => {
//   // State variables
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
//   const [newColumns, setNewColumns] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showColumnMapping, setShowColumnMapping] = useState(false);
//   const [allColumnsMatched, setAllColumnsMatched] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [usedBackendColumns, setUsedBackendColumns] = useState([]);
  
//   const fileInputRef = useRef(null);


//   // Function to process uploaded files
//   const processFiles = (files) => {
//     const newErrors = {};
//     let processedFiles = 0;
//     const allUploadedColumns = new Set();
//     const fileDataArray = [];
//     let allMatched = true;

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (data.length > 0) {
//           const uploadedColumns = data[0];
//           const unmatchedColumns = uploadedColumns.filter(
//             (col) => !backendColumns.includes(col)
//           );

//           if (unmatchedColumns.length > 0) {
//             newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
//               ", "
//             )}`;
//             allMatched = false;
//           }

//           fileDataArray.push({ name: file.name, data, workbook, sheetName });
//           uploadedColumns.forEach((col) => allUploadedColumns.add(col));
//         }

//         processedFiles++;
//         if (processedFiles === files.length) {
//           setErrors(newErrors);
//           setFilesData(fileDataArray);
//           const initialColumns = Array.from(allUploadedColumns).map((col) => {
//             const isMatched = backendColumns.includes(col);
//             if (isMatched) {
//               setUsedBackendColumns((prev) => [...prev, col]);
//             }
//             return {
//               name: col,
//               backendColumn: isMatched ? col : "",
//               isMatched: isMatched,
//             };
//           });
//           setNewColumns(initialColumns);
//           setShowColumnMapping(!allMatched);
//           setAllColumnsMatched(allMatched);
          
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   // Function to handle file upload
//   const handleFileUpload = () => {
//     if (fileInputRef.current.files.length > 0) {
//       const files = Array.from(fileInputRef.current.files);
//       setUsedBackendColumns([]);
//       processFiles(files);
//     }
//   };

//   // Function to handle backend column selection
//   const handleBackendColumnSelect = (index, selectedColumn) => {
//     const updatedColumns = [...newColumns];
//     const previousBackendColumn = updatedColumns[index].backendColumn;

//     if (previousBackendColumn) {
//       setUsedBackendColumns((prev) =>
//         prev.filter((col) => col !== previousBackendColumn)
//       );
//     }

//     updatedColumns[index].backendColumn = selectedColumn;
//     updatedColumns[index].isMatched = true;
//     setNewColumns(updatedColumns);

//     if (selectedColumn) {
//       setUsedBackendColumns((prev) => [...prev, selectedColumn]);
//     }
//   };

//   // Function to update columns and trigger file upload
//   const handleUpdateColumns = () => {
//     const updatedBackendColumns = Array.from(
//       new Set([
//         ...backendColumns,
//         ...newColumns.map((col) => col.backendColumn).filter(Boolean),
//       ])
//     );
//     setBackendColumns(updatedBackendColumns);
//     uploadExcelFiles();
//     setShowColumnMapping(false);
//     setNewColumns([]);
//     setErrors({});
//     setAllColumnsMatched(true);
//     setUsedBackendColumns([]);
//     fileInputRef.current.value = null;
//   };

//   // Function to upload Excel files to the backend
//   const uploadExcelFiles = async () => {
//     const apiUrl = "https://testsignuplogin.onrender.com/login/upload/1";

//     for (const fileData of filesData) {
//       const { data, workbook, sheetName, name } = fileData;
//       const updatedHeader = newColumns.map(
//         (col) => col.backendColumn || col.name
//       );
//       data[0] = updatedHeader; // Update the header row
//       const updatedSheet = XLSX.utils.aoa_to_sheet(data);
//       workbook.Sheets[sheetName] = updatedSheet;
//       const updatedWorkbookArray = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       // Create a FormData object to send the file
//       const formData = new FormData();
//       formData.append("file", updatedWorkbookBlob, name);
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.post(apiUrl, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//           },
//         });
//         console.log(`File ${name} uploaded successfully:`, response.data);
//       } catch (error) {
//         console.error(`Error uploading file ${name}:`, error);
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: `Upload failed: ${error.message}`,
//         }));
//       }
//     }
//   };

//   // Function to handle upload to backend button click
//   const handleUploadToBackend = () => {
//     uploadExcelFiles();
//   };

//   // Render the component
//   return (
//     <div>
//       <h1>Excel Column Manager</h1>
//       <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
//       <button onClick={handleFileUpload}>Upload Files</button>

//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h2>Errors:</h2>
//           <ul>
//             {Object.entries(errors).map(([fileName, error]) => (
//               <li key={fileName}>
//                 <strong>{fileName}:</strong> {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {allColumnsMatched && (
//         <div>
//           <h2>All columns matched successfully!</h2>
//           <button onClick={handleUploadToBackend}>Upload to Backend</button>
//         </div>
//       )}

//       {showColumnMapping && (
//         <div>
//           <h2>Column Mapping:</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Excel Column</th>
//                 <th>Backend Column</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newColumns.map((col, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor: col.isMatched ? "white" : "yellow",
//                   }}
//                 >
//                   <td>{col.name}</td>
//                   <td>
//                     <select
//                       value={col.backendColumn}
//                       onChange={(e) =>
//                         handleBackendColumnSelect(index, e.target.value)
//                       }
//                     >
//                       <option value="">Select backend column</option>
//                       {backendColumns.map((backendCol) => (
//                         <option
//                           key={backendCol}
//                           value={backendCol}
//                           disabled={
//                             usedBackendColumns.includes(backendCol) &&
//                             backendCol !== col.backendColumn
//                           }
//                         >
//                           {backendCol}
//                         </option>
//                       ))}
//                       <option value={col.name}>Add as new column</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpdateColumns}>Update Columns List</button>
//         </div>
//       )}

      
//     </div>
//   );
// };

// export default ExcelUploader;

// ---------------------------------------------------

// import React, { useState, useRef } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const ExcelUploader = () => {
//   // State variables
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
//   const [newColumns, setNewColumns] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showColumnMapping, setShowColumnMapping] = useState(false);
//   const [allColumnsMatched, setAllColumnsMatched] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [usedBackendColumns, setUsedBackendColumns] = useState([]);

//   const fileInputRef = useRef(null);

//   // Function to process uploaded files
//   const processFiles = (files) => {
//     const newErrors = {};
//     let processedFiles = 0;
//     const allUploadedColumns = new Set();
//     const fileDataArray = [];
//     let allMatched = true;

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (data.length > 0) {
//           const uploadedColumns = data[0];
//           const unmatchedColumns = uploadedColumns.filter(
//             (col) => !backendColumns.includes(col)
//           );

//           if (unmatchedColumns.length > 0) {
//             newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
//               ", "
//             )}`;
//             allMatched = false;
//           }

//           fileDataArray.push({ name: file.name, data, workbook, sheetName });
//           uploadedColumns.forEach((col) => allUploadedColumns.add(col));
//         }

//         processedFiles++;
//         if (processedFiles === files.length) {
//           setErrors(newErrors);
//           setFilesData(fileDataArray);
//           const initialColumns = Array.from(allUploadedColumns).map((col) => {
//             const isMatched = backendColumns.includes(col);
//             if (isMatched) {
//               setUsedBackendColumns((prev) => [...prev, col]);
//             }
//             return {
//               name: col,
//               backendColumn: isMatched ? col : "",
//               isMatched: isMatched,
//             };
//           });
//           setNewColumns(initialColumns);
//           setShowColumnMapping(!allMatched);
//           setAllColumnsMatched(allMatched);
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   // Function to handle file upload
//   const handleFileUpload = () => {
//     if (fileInputRef.current.files.length > 0) {
//       const files = Array.from(fileInputRef.current.files);
//       setUsedBackendColumns([]);
//       processFiles(files);
//     }
//   };

//   // Function to handle backend column selection
//   const handleBackendColumnSelect = (index, selectedColumn) => {
//     const updatedColumns = [...newColumns];
//     const previousBackendColumn = updatedColumns[index].backendColumn;

//     if (previousBackendColumn) {
//       setUsedBackendColumns((prev) =>
//         prev.filter((col) => col !== previousBackendColumn)
//       );
//     }

//     updatedColumns[index].backendColumn = selectedColumn;
//     updatedColumns[index].isMatched = true;
//     setNewColumns(updatedColumns);

//     if (selectedColumn) {
//       setUsedBackendColumns((prev) => [...prev, selectedColumn]);
//     }
//   };

//   // Function to update columns and trigger file upload
//   const handleUpdateColumns = () => {
//     const updatedBackendColumns = Array.from(
//       new Set([
//         ...backendColumns,
//         ...newColumns.map((col) => col.backendColumn).filter(Boolean),
//       ])
//     );
//     setBackendColumns(updatedBackendColumns);
//     uploadExcelFiles();
//     setShowColumnMapping(false);
//     setNewColumns([]);
//     setErrors({});
//     setAllColumnsMatched(true);
//     setUsedBackendColumns([]);
//     fileInputRef.current.value = null;
//   };

//   // Function to upload Excel files to the backend
//   const uploadExcelFiles = async () => {
//     const apiUrl = "https://testsignuplogin.onrender.com/login/upload/1";

//     for (const fileData of filesData) {
//       const { data, workbook, sheetName, name } = fileData;
//       const updatedHeader = newColumns.map(
//         (col) => col.backendColumn || col.name
//       );
//       data[0] = updatedHeader; // Update the header row
//       const updatedSheet = XLSX.utils.aoa_to_sheet(data);
//       workbook.Sheets[sheetName] = updatedSheet;
//       const updatedWorkbookArray = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       // Create a FormData object to send the file
//       const formData = new FormData();
//       formData.append("file", updatedWorkbookBlob, name);
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.post(apiUrl, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//           },
//         });
//         console.log(`File ${name} uploaded successfully:`, response.data);
//       } catch (error) {
//         console.error(`Error uploading file ${name}:`, error);
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: `Upload failed: ${error.message}`,
//         }));
//       }
//     }
//   };

//   // Function to handle upload to backend button click
//   const handleUploadToBackend = () => {
//     uploadExcelFiles();
//   };

//   // Render the component
//   return (
//     <div>
//       <h1>Excel Column Manager</h1>
//       <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
//       <button onClick={handleFileUpload}>Upload Files</button>

//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h2>Errors:</h2>
//           <ul>
//             {Object.entries(errors).map(([fileName, error]) => (
//               <li key={fileName}>
//                 <strong>{fileName}:</strong> {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {allColumnsMatched && (
//         <div>
//           <h2>All columns matched successfully!</h2>
//           <button onClick={handleUploadToBackend}>Upload to Backend</button>
//         </div>
//       )}

//       {showColumnMapping && (
//         <div>
//           <h2>Column Mapping:</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Excel Column</th>
//                 <th>Backend Column</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newColumns.map((col, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor: col.isMatched ? "white" : "yellow",
//                   }}
//                 >
//                   <td>{col.name}</td>
//                   <td>
//                     <select
//                       value={col.backendColumn}
//                       onChange={(e) =>
//                         handleBackendColumnSelect(index, e.target.value)
//                       }
//                     >
//                       <option value="">Select backend column</option>
//                       {backendColumns.map((backendCol) => (
//                         <option
//                           key={backendCol}
//                           value={backendCol}
//                           disabled={
//                             usedBackendColumns.includes(backendCol) &&
//                             backendCol !== col.backendColumn
//                           }
//                         >
//                           {backendCol}
//                         </option>
//                       ))}
//                       <option value={col.name}>Add as new column</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpdateColumns}>Update Columns List</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;

// ---------------------------------------------------------------------------

// import React, { useState, useRef } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const ExcelUploader = () => {
//   // State variables
//   const [backendColumns, setBackendColumns] = useState([
    // "Text 1",
    // "Text 2",
    // "Text 3",
    // "Text 4",
    // "Text 5",
    // "Text 6",
    // "Text 7",
    // "Text 8",
    // "Text 9",
    // "Text 10",
    // "Text 11",
    // "Text 12",
    // "Text 13",
    // "Text 14",
    // "Text 15",
    // "Numeric 1",
    // "Numeric 2",
    // "Numeric 3",
    // "Numeric 4",
    // "Numeric 5",
    // "Numeric 6",
    // "Numeric 7",
    // "Numeric 8",
    // "Numeric 9",
    // "Numeric 10",
    // "Numeric 11",
    // "Numeric 12",
    // "Spare Text 1",
    // "Spare Text 2",
    // "Spare Numeric 1",
    // "Spare Numeric 2",
//   ]);
//   const [newColumns, setNewColumns] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showColumnMapping, setShowColumnMapping] = useState(false);
//   const [allColumnsMatched, setAllColumnsMatched] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [usedBackendColumns, setUsedBackendColumns] = useState([]);

//   const fileInputRef = useRef(null);

//   // Function to process uploaded files
//   const processFiles = (files) => {
//     const newErrors = {};
//     let processedFiles = 0;
//     const allUploadedColumns = new Set();
//     const fileDataArray = [];
//     let allMatched = true;

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (data.length > 0) {
//           const uploadedColumns = data[0];
//           const unmatchedColumns = uploadedColumns.filter(
//             (col) => !backendColumns.includes(col)
//           );

//           if (unmatchedColumns.length > 0) {
//             newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
//               ", "
//             )}`;
//             allMatched = false;
//           }

//           fileDataArray.push({ name: file.name, data, workbook, sheetName });
//           uploadedColumns.forEach((col) => allUploadedColumns.add(col));
//         }

//         processedFiles++;
//         if (processedFiles === files.length) {
//           setErrors(newErrors);
//           setFilesData(fileDataArray);
//           const initialColumns = Array.from(allUploadedColumns).map((col) => {
//             const isMatched = backendColumns.includes(col);
//             if (isMatched) {
//               setUsedBackendColumns((prev) => [...prev, col]);
//             }
//             return {
//               name: col,
//               backendColumn: isMatched ? col : "",
//               isMatched: isMatched,
//             };
//           });
//           setNewColumns(initialColumns);
//           setShowColumnMapping(!allMatched);
//           setAllColumnsMatched(allMatched);
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   // Function to handle file upload
//   const handleFileUpload = () => {
//     if (fileInputRef.current.files.length > 0) {
//       const files = Array.from(fileInputRef.current.files);
//       setUsedBackendColumns([]);
//       processFiles(files);
//     }
//   };

//   // Function to handle backend column selection
//   const handleBackendColumnSelect = (index, selectedColumn) => {
//     const updatedColumns = [...newColumns];
//     const previousBackendColumn = updatedColumns[index].backendColumn;

//     if (previousBackendColumn) {
//       setUsedBackendColumns((prev) =>
//         prev.filter((col) => col !== previousBackendColumn)
//       );
//     }

//     updatedColumns[index].backendColumn = selectedColumn;
//     updatedColumns[index].isMatched = true;
//     setNewColumns(updatedColumns);

//     if (selectedColumn) {
//       setUsedBackendColumns((prev) => [...prev, selectedColumn]);
//     }
//   };

//   // Function to update columns and trigger file upload
//   const handleUpdateColumns = () => {
//     const updatedBackendColumns = Array.from(
//       new Set([
//         ...backendColumns,
//         ...newColumns.map((col) => col.backendColumn).filter(Boolean),
//       ])
//     );
//     setBackendColumns(updatedBackendColumns);
//     uploadExcelFiles();
//     setShowColumnMapping(false);
//     setNewColumns([]);
//     setErrors({});
//     setAllColumnsMatched(true);
//     setUsedBackendColumns([]);
//     fileInputRef.current.value = null;
//   };

//   // Function to upload Excel files to the backend
//   const uploadExcelFiles = async () => {
//     const apiUrl = "https://testsignuplogin.onrender.com/login/upload/1";

//     for (const fileData of filesData) {
//       const { data, workbook, sheetName, name } = fileData;
//       const updatedHeader = newColumns.map(
//         (col) => col.backendColumn || col.name
//       );
//       data[0] = updatedHeader; // Update the header row
//       const updatedSheet = XLSX.utils.aoa_to_sheet(data);
//       workbook.Sheets[sheetName] = updatedSheet;
//       const updatedWorkbookArray = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       // Create a FormData object to send the file
//       const formData = new FormData();
//       formData.append("file", updatedWorkbookBlob, name);
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.post(apiUrl, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//           },
//         });
//         console.log(`File ${name} uploaded successfully:`, response.data);
//       } catch (error) {
//         console.error(`Error uploading file ${name}:`, error);
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: `Upload failed: ${error.message}`,
//         }));
//       }
//     }
//   };

//   // Function to handle upload to backend button click
//   const handleUploadToBackend = () => {
//     uploadExcelFiles();
//   };

//   // Render the component
//   return (
//     <div>
//       <h1>Excel Column Manager</h1>
//       <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
//       <button onClick={handleFileUpload}>Upload Files</button>

//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h2>Errors:</h2>
//           <ul>
//             {Object.entries(errors).map(([fileName, error]) => (
//               <li key={fileName}>
//                 <strong>{fileName}:</strong> {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {allColumnsMatched && (
//         <div>
//           <h2>All columns matched successfully!</h2>
//           <button onClick={handleUploadToBackend}>Upload to Backend</button>
//         </div>
//       )}

//       {showColumnMapping && (
//         <div>
//           <h2>Column Mapping:</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Excel Column</th>
//                 <th>Backend Column</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newColumns.map((col, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor: col.isMatched ? "white" : "yellow",
//                   }}
//                 >
//                   <td>{col.name}</td>
//                   <td>
//                     <select
//                       value={col.backendColumn}
//                       onChange={(e) =>
//                         handleBackendColumnSelect(index, e.target.value)
//                       }
//                     >
//                       <option value="">Select backend column</option>
//                       {backendColumns.map((backendCol) => (
//                         <option
//                           key={backendCol}
//                           value={backendCol}
//                           disabled={
//                             usedBackendColumns.includes(backendCol) &&
//                             backendCol !== col.backendColumn
//                           }
//                         >
//                           {backendCol}
//                         </option>
//                       ))}
//                       <option value={col.name}>Add as new column</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpdateColumns}>Update Columns List</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;

// ---------------------------------------------------------

// import React, { useState, useRef } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const ExcelUploader = () => {
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
//     // Add your backend column names here
//   ]);
//   const [newColumns, setNewColumns] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showColumnMapping, setShowColumnMapping] = useState(false);
//   const [allColumnsMatched, setAllColumnsMatched] = useState(false);
//   const [filesData, setFilesData] = useState([]);
//   const [usedBackendColumns, setUsedBackendColumns] = useState([]);
//   const fileInputRef = useRef(null);

//   const processFiles = (files) => {
//     const newErrors = {};
//     let processedFiles = 0;
//     const allUploadedColumns = new Set();
//     const fileDataArray = [];
//     let allMatched = true;

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (data.length > 0) {
//           const uploadedColumns = data[0];
//           const unmatchedColumns = uploadedColumns.filter(
//             (col) => !backendColumns.includes(col)
//           );

//           if (unmatchedColumns.length > 0) {
//             newErrors[file.name] = `Unmatched columns: ${unmatchedColumns.join(
//               ", "
//             )}`;
//             allMatched = false;
//           }

//           fileDataArray.push({ name: file.name, data, workbook, sheetName });
//           uploadedColumns.forEach((col) => allUploadedColumns.add(col));
//         }

//         processedFiles++;
//         if (processedFiles === files.length) {
//           setErrors(newErrors);
//           setFilesData(fileDataArray);
//           const initialColumns = Array.from(allUploadedColumns).map((col) => {
//             const isMatched = backendColumns.includes(col);
//             if (isMatched) {
//               setUsedBackendColumns((prev) => [...prev, col]);
//             }
//             return {
//               name: col,
//               backendColumn: isMatched ? col : "",
//               isMatched: isMatched,
//             };
//           });
//           setNewColumns(initialColumns);
//           setShowColumnMapping(!allMatched);
//           setAllColumnsMatched(allMatched);
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   const handleFileUpload = () => {
//     if (fileInputRef.current.files.length > 0) {
//       const files = Array.from(fileInputRef.current.files);
//       setUsedBackendColumns([]);
//       processFiles(files);
//     }
//   };

//   const handleBackendColumnSelect = (index, selectedColumn) => {
//     const updatedColumns = [...newColumns];
//     const previousBackendColumn = updatedColumns[index].backendColumn;

//     if (previousBackendColumn) {
//       setUsedBackendColumns((prev) =>
//         prev.filter((col) => col !== previousBackendColumn)
//       );
//     }

//     updatedColumns[index].backendColumn = selectedColumn;
//     updatedColumns[index].isMatched = true;
//     setNewColumns(updatedColumns);

//     if (selectedColumn) {
//       setUsedBackendColumns((prev) => [...prev, selectedColumn]);
//     }
//   };

//   const handleUpdateColumns = async () => {
//     const updatedBackendColumns = Array.from(
//       new Set([
//         ...backendColumns,
//         ...newColumns.map((col) => col.backendColumn).filter(Boolean),
//       ])
//     );
//     setBackendColumns(updatedBackendColumns);
//     await updateExcelFiles(); // Wait for files to be updated
//     setShowColumnMapping(false);
//     setNewColumns([]);
//     setErrors({});
//     setAllColumnsMatched(true);
//     setUsedBackendColumns([]);
//     fileInputRef.current.value = null;
//   };

//   const updateExcelFiles = async () => {
//     const formDataArray = [];

//     filesData.forEach((fileData) => {
//       const { data, workbook, sheetName } = fileData;
//       const updatedHeader = newColumns.map(
//         (col) => col.backendColumn || col.name
//       );
//       data[0] = updatedHeader; // Update the header row
//       const updatedSheet = XLSX.utils.aoa_to_sheet(data);
//       workbook.Sheets[sheetName] = updatedSheet;
//       const updatedWorkbookArray = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
//         type: "application/octet-stream",
//       });

//       const formData = new FormData();
//       formData.append("file", updatedWorkbookBlob, `updated_${fileData.name}`);
//       formDataArray.push(formData);
//     });

//     const token = localStorage.getItem("token"); 
//     const promises = formDataArray.map((formData) =>
//       axios.post(
//         "https://testsignuplogin.onrender.com/login/upload/1",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//     );

//     await Promise.all(promises);
//   };

//   return (
//     <div>
//       <h1>Excel Column Manager</h1>
//       <input type="file" accept=".xlsx, .xls" multiple ref={fileInputRef} />
//       <button onClick={handleFileUpload}>Upload Files</button>

//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h2>Errors:</h2>
//           <ul>
//             {Object.entries(errors).map(([fileName, error]) => (
//               <li key={fileName}>
//                 <strong>{fileName}:</strong> {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {allColumnsMatched && (
//         <div>
//           <h2>All columns matched successfully!</h2>
//           <button onClick={handleUpdateColumns}>Proceed with Upload</button>
//         </div>
//       )}

//       {showColumnMapping && (
//         <div>
//           <h2>Column Mapping:</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Excel Column</th>
//                 <th>Backend Column</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newColumns.map((col, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor: col.isMatched ? "white" : "yellow",
//                   }}
//                 >
//                   <td>{col.name}</td>
//                   <td>
//                     <select
//                       value={col.backendColumn}
//                       onChange={(e) =>
//                         handleBackendColumnSelect(index, e.target.value)
//                       }
//                     >
//                       <option value="">Select backend column</option>
//                       {backendColumns.map((backendCol) => (
//                         <option
//                           key={backendCol}
//                           value={backendCol}
//                           disabled={
//                             usedBackendColumns.includes(backendCol) &&
//                             backendCol !== col.backendColumn
//                           }
//                         >
//                           {backendCol}
//                         </option>
//                       ))}
//                       <option value={col.name}>Add as new column</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpdateColumns}>Update Columns List</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;
