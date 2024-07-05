import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "../components/admin/LoginPage";
import Dashboard from "../components/admin/Dashboard";
// import PowerBiData from "../components/admin/PowerBiData";
// import SignUpPage from "../components/admin/SignUpPage";
import AdminUserList from "../components/admin/AdminUserList";
import UploadFiles from "../components/admin/UploadFiles";
import UserDashboard from "../components/users/UserDashboard";
import UserUploadFiles from "../components/users/UserUploadFiles";
import UserPowerBiData from "../components/users/UserPowerBiData";
// import Dummy from "../components/admin/Dummy";
import Data from "../components/admin/Data";
import UserUploadedData from "../components/users/UserUploadedData";
// import ColumnMapping from "../components/admin/ColumnMapping";
// import UsersColumnMapping from "../components/users/UsersColumnMapping";
import Login from "../components/home/Login";
import UserLandingPage from "../components/users/UserLandingPage";
import ChooseVariables from "../components/users/ChooseVariables";
import ExcelUploader from "../components/users/Demo";
import NewExcelUploader from "../components/users/Dummy_2";
// import Dashboard from "../components/user/Dashboard";

// Higher-order component to protect routes
const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Assuming token is stored in localStorage

  return isAuthenticated ? element : <Navigate to="/" />;
};

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
        {/* <Route path="/power-bi-data" element={<PowerBiData />} /> */}
        {/* <Route path="/dummy" element={<Dummy />} /> */}
        {/* <Route path="/column-mapping" element={<ColumnMapping />} /> */}

        <Route path="/" element={<Login />} />
        <Route path="/upload-files" element={<UploadFiles />} />
        <Route path="/data" element={<Data />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/admin-user-list"
          element={<ProtectedRoute element={<AdminUserList />} />}
        />

        {/* user-routes */}
        <Route
          path="/user-dashboard"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />
        <Route
          path="/user-upload-files"
          element={<ProtectedRoute element={<UserUploadFiles />} />}
        />
        <Route
          path="/user-power-bi-data"
          element={<ProtectedRoute element={<UserPowerBiData />} />}
        />
        <Route path="/user-uploaded-data" element={<UserUploadedData />} />
        <Route
          path="/user-landing-page"
          element={<ProtectedRoute element={<UserLandingPage />} />}
        />
        <Route path="/choose-variables-page" element={<ChooseVariables />} />
        <Route path="/excel-uploader" element={<ExcelUploader />} />
        <Route path="/new-excel-uploader" element={<NewExcelUploader />} />
        {/* <Route path="/users-column-mapping" element={<UsersColumnMapping />} /> */}
      </Routes>
    </div>
  );
};

export default AllRoutes;
