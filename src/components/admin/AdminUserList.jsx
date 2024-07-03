// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// import "./DataTable.css";

// const DataTable = () => {
//   const [formData, setFormData] = useState({
//     role: "",
//     email: "",
//     password: "",
//   });

//   const [userList, setUserList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     axios
//       .post("https://excel-mysql.onrender.com/api/createusers", formData)
//       .then((response) => {
//         console.log(response.data);
//         // Update user list with the new user
//         setUserList([...userList, formData]);
//         // Reset form after submission
//         setFormData({
//           role: "",
//           email: "",
//           password: "",
//         });
//         setSubmitting(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setSubmitting(false);
//         console.error("There was an error creating the user!", error);
//       });
//   };

//   const getAllUserList = () => {
//     axios
//       .get("https://excel-mysql.onrender.com/api/getallusers")
//       .then((response) => {
//         setUserList(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//         console.error("There was an error fetching the data!", error);
//       });
//   };

//   useEffect(() => {
//     getAllUserList();
//   }, []);

//   return (
//     <div>
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <h3 className="card-title fw-bold">User List</h3>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
//               <div>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   data-bs-toggle="modal"
//                   data-bs-target="#add-modal-form"
//                 >
//                   <i className="bx bx-plus me-1" /> Add New
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="">
//               <div className="table-responsive table-bordered">
//                 {loading ? (
//                   <div className="text-center">
//                     <div className="spinner-border" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <table className="table table-hover table-nowrap align-middle table-borderless">
//                     <thead>
//                       <tr className="table-danger">
//                         <th scope="col">Sr.No.</th>
//                         <th scope="col">Role</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Password</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {error ? (
//                         <tr>
//                           <td colSpan="4" className="text-center text-danger">
//                             {error}
//                           </td>
//                         </tr>
//                       ) : (
//                         userList.map((user, index) => (
//                           <tr key={user.email} className="table-row-hover">
//                             <td>{index + 1}</td>
//                             <td>{user.role}</td>
//                             <td>{user.email}</td>
//                             <td>
//                               <span className="badge badge-soft-success mb-0">
//                                 ********
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add modal code here */}
//       <div>
//         <div
//           className="modal fade"
//           id="add-modal-form"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex={-1}
//           aria-labelledby="staticBackdropLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">
//                   Add User
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 />
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     {/* <label htmlFor="role" className="form-label">
//                       Role
//                     </label> */}
//                     <input
//                       type="text"
//                       placeholder="role"
//                       className="form-control custom-input"
//                       id="role"
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     {/* <label htmlFor="email" className="form-label">
//                       Email
//                     </label> */}
//                     <input
//                       type="email"
//                       placeholder="email"
//                       className="form-control custom-input mt-4"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     {/* <label htmlFor="password" className="form-label">
//                       Password
//                     </label> */}
//                     <input
//                       type="password"
//                       placeholder="password"
//                       className="form-control custom-input mt-4"
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer justify-content-center">
//                   <button
//                     type="submit"
//                     className="btn btn-info px-5 py-2"
//                     data-bs-dismiss="modal"
//                     disabled={submitting}
//                   >
//                     {submitting ? "Submitting..." : "Submit"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add modal code here */}
//     </div>
//   );
// };

// export default DataTable;

// // ------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminUserList.css";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

import { Link, useNavigate } from "react-router-dom";
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

const AdminUserList = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    category: "",
  });

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");

    axios
      .post("https://testsignuplogin.onrender.com/signup", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update user list with the new user
        setUserList([...userList, formData]);
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          category: "",
        });
        setSubmitting(false);
        // window.location.reload(); // remove it after issue is resolved
        getAllUserList();
        toast.success("User added successfully !");
      })
      .catch((error) => {
        setError(error.message);
        setSubmitting(false);
        console.error("There was an error creating the user!", error);
      });
  };

  // ------------------------------------------------------------

  // -----------------------------------------------------------
  // const getAllUserList = () => {

  //   axios
  //     // .get("https://excel-mysql.onrender.com/api/getallusers")
  //     .get("http://localhost:8001/api/getallusers")
  //     .then((response) => {
  //       setUserList(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //       console.error("There was an error fetching the data!", error);
  //     });
  // };

  const getAllUserList = () => {
    const token = localStorage.getItem("token");
    // console.log("ksdncksnckk")

    axios
      .get("https://testsignuplogin.onrender.com/login/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  const handleDelete = (userId) => {
    console.log(userId);
    const token = localStorage.getItem("token"); // or wherever you store your token

    axios
      .delete(`https://testsignuplogin.onrender.com/login/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Remove user from the list after deletion
        const updatedUserList = userList.filter((user) => user.id !== userId);
        setUserList(updatedUserList);
        console.log("updated userlist", updatedUserList);

        toast.error("User deleted successfully!");
      })
      .catch((error) => {
        setError(error.message);
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <div className="container-fluid mt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-3">
                <h3 className="card-title fw-bold">User List</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                <div>
                  <button
                  style={{backgroundColor:"goldenrod"}}
                    type="button"
                    className="btn me-5 text-blue"
                    data-bs-toggle="modal"
                    data-bs-target="#add-modal-form"
                  >
                    <i className="bx bx-plus me-1" /> Add New
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                <div className="table-responsive table-bordered">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                      </div>
                      <p>Wait a sec...</p>
                    </div>
                  ) : (
                    <table className="table table-hover table-nowrap align-middle table-borderless">
                      <thead>
                        <tr className="table-success">
                          <th scope="col">Sr.No.</th>
                          <th scope="col">Role</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Category</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {error ? (
                          <tr>
                            <td colSpan="4" className="text-center text-danger">
                              {error}
                            </td>
                          </tr>
                        ) : (
                          userList.map((user, index) => (
                            <tr key={user.email} className="table-row-hover">
                              <td>{index + 1}</td>
                              <td>{user.role}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.category}</td>

                              <td>
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <a
                                      href="javascript:void(0);"
                                      data-bs-placement="top"
                                      title="Delete"
                                      className="px-2 text-danger"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete-modal"
                                      onClick={() => setUserToDelete(user)}
                                    >
                                      <i className="bx bx-trash-alt font-size-24" />
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add modal code here */}
        <div>
          <div
            className="modal fade"
            id="add-modal-form"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 fw-bold"
                    id="staticBackdropLabel"
                  >
                    Add User
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control custom-input"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="email"
                        className="form-control custom-input mt-4"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="password"
                        className="form-control custom-input mt-4"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="role"
                        className="form-control custom-input"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Category"
                        className="form-control custom-input"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-info px-5 py-2"
                      data-bs-dismiss="modal"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Add modal code here */}

        {/* Delete modal code here */}
        <div>
          <div
            className="modal fade"
            id="delete-modal"
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
                    Are you sure you want to delete this user ?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                {/* <div className="modal-body"> Write Some Data Here </div> */}
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
                    onClick={() => handleDelete(userToDelete.id)}
                  >
                    Confirm ?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete modal code here */}

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
      </div>
    </div>
  );
};
export default AdminUserList;
