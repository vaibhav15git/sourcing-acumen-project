# sourcing-acumen-project

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const ExcelUploader = () => {
  const [backendColumns, setBackendColumns] = useState([
    "Text 1",
    "Text 2",
    "Text 3",
    "Text 4",
  ]);
  const [newColumns, setNewColumns] = useState([]);
  const [errors, setErrors] = useState({});
  const [showColumnMapping, setShowColumnMapping] = useState(false);
  const [allColumnsMatched, setAllColumnsMatched] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [usedBackendColumns, setUsedBackendColumns] = useState([]);
  const [updatedSheets, setUpdatedSheets] = useState([]); // New state for storing updated sheets
  const fileInputRef = useRef(null);

  const token = "your_auth_token_here";

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
          console.log(`Columns in ${file.name}:`, uploadedColumns);

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
          setShowColumnMapping(!allMatched);
          setAllColumnsMatched(allMatched);
          console.log("All unique columns:", Array.from(allUploadedColumns));
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

    console.log("Updated backend columns:", updatedBackendColumns);
    console.log("New columns mapping:", newColumns);

    const updatedSheetsArray = filesData.map((fileData) => {
      const { data, workbook, sheetName, name } = fileData;
      const updatedHeader = newColumns.map(
        (col) => col.backendColumn || col.name
      );
      data[0] = updatedHeader; // Update the header row
      console.log(`Updated header for ${name}:`, updatedHeader);

      const updatedSheet = XLSX.utils.aoa_to_sheet(data);
      workbook.Sheets[sheetName] = updatedSheet;
      const updatedWorkbookArray = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const updatedWorkbookBlob = new Blob([updatedWorkbookArray], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      return { name, blob: updatedWorkbookBlob };
    });

    setUpdatedSheets(updatedSheetsArray);
    setShowColumnMapping(false);
    setNewColumns([]);
    setErrors({});
    setAllColumnsMatched(true);
    setUsedBackendColumns([]);
    fileInputRef.current.value = null;
  };

  const uploadExcelFiles = async () => {
    const apiUrl = "https://testsignuplogin.onrender.com/login/upload/1";

    for (const sheetData of updatedSheets) {
      const { name, blob } = sheetData;
      const formData = new FormData();
      formData.append("file", blob, name);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`File ${name} uploaded successfully:`, response.data);
      } catch (error) {
        console.error(`Error uploading file ${name}:`, error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Upload failed: ${error.message}`,
        }));
      }
    }
  };

  const handleUploadToBackend = () => {
    uploadExcelFiles();
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

      {allColumnsMatched && (
        <div>
          <h2>All columns matched successfully!</h2>
          <button onClick={handleUploadToBackend}>Upload to Backend</button>
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

      <div>
        <h2>Current Backend Columns:</h2>
        <ul>
          {backendColumns.map((col, index) => (
            <li key={index}>{col}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExcelUploader;