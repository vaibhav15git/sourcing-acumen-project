import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles) {
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
            Authorization: `Bearer ${token}`, // Replace 'your-token' with the actual token
          },
        }
      );

      if (response.status === 200) {
        console.log("Files uploaded successfully:", response.data.files);
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

  return (
    <div>
      <h2>Upload Files2</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="files" multiple onChange={handleFileChange} />
        <button type="submit">Upload Files</button>
      </form>
    </div>
  );
};

export default FileUpload;
