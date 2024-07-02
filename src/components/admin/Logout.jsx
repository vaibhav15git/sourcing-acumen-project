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

// -------------------------------------------------------

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear token from local storage
//     localStorage.removeItem("token");
//     // Redirect to home page
//     alert("Are you sure you want to logout?");
//     navigate("/");
//   };


//   return (
//     <>
//       <button
//         className="btn btn-link text-black text-decoration-none p-0"
//         data-bs-toggle="modal"
//         data-bs-target="#logoutModal"
//       >
//         Logout
//       </button>

//       {/* Logout Modal */}
//       <div
//         className="modal fade"
//         id="logoutModal"
//         tabIndex="-1"
//         aria-labelledby="logoutModalLabel"
//         aria-hidden="true"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="logoutModalLabel">
//                 Are you sure you want to logout?
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-footer justify-content-center">
//               <button type="button" className="btn btn-secondary">
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={handleLogout}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Logout;
