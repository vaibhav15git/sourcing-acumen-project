import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // Redirect to home page
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout} className="btn btn-link text-black text-decoration-none p-0">
        Logout
      </button>
    </>
  );
};

export default Logout;
