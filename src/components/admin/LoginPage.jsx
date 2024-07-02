// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./LoginPage.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const validateForm = () => {
//     const errors = {};
//     if (!email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Email address is invalid";
//     }

//     if (!password) {
//       errors.password = "Password is required";
//     } else if (password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           // "https://excel-mysql.onrender.com/api/login",
//           "http://localhost:8001/api/login",
//           {
//             email,
//             password,
//           }
//         );
//         toast.success("Login successful!");
//         const token = response.token; // Assuming the token is in response.data.token

//         console.log(token);

//         // Handle successful login (e.g., save token, redirect)
//         navigate("dashboard"); // Redirect to data table page
//       } catch (error) {
//         toast.error(
//           "Login failed. Please check your credentials and try again."
//         );
//         setMessage(
//           "Login failed. Please check your credentials and try again."
//         );
//       }
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row vh-100">
//           <div className="col-md-6 d-none d-md-flex bg-image"></div>
//           <div className="col-md-6 d-flex align-items-center justify-content-center login-form-background">
//             <div className="form-container">
//               <h2 className="text-center mb-4 fst-italic">
//                 Please Login First !
//               </h2>
//               <form onSubmit={handleSubmit}>
//                 {message && <div className="alert alert-info">{message}</div>}
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className={`form-control mt-5 custom-input ${
//                       errors.email ? "is-invalid" : ""
//                     }`}
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   {errors.email && (
//                     <div className="invalid-feedback">{errors.email}</div>
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className={`form-control mt-3 custom-input ${
//                       errors.password ? "is-invalid" : ""
//                     }`}
//                     id="exampleInputPassword1"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   {errors.password && (
//                     <div className="invalid-feedback">{errors.password}</div>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100 mt-5 custom-submit-btn"
//                 >
//                   Submit
//                 </button>
//               </form>
//               {/* <div className="mt-3">
//                 Don't have an account ?{" "}
//                 <span>
//                   <Link to="/sign-up">Click Here</Link>
//                 </span>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

// --------------------------------------------------------------------------

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } 
  

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://testsignuplogin.onrender.com/login",
          {
            email,
            password,
          }
        );
        toast.success("Login successful!");
        const { token, user  } = response.data;
        // console.log(token,user.role,user.id);

        // Save token to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
       

        // Handle successful login (e.g., redirect)
        if (user.role === "admin") {
          navigate("/dashboard"); // Redirect to admin dashboard
        } else if (user.role === "user") {
          navigate("/user-dashboard"); // Redirect to user dashboard
        } else {
          toast.error("Unknown role");
        }
      } catch (error) {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
        setMessage(
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

 
  return (
    <>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6 d-flex align-items-center justify-content-center login-form-background">
            <div className="form-container">
              <h2 className="text-center mb-4 fst-italic">
                Please Login First !
              </h2>
              <form onSubmit={handleSubmit}>
                {message && <div className="alert alert-info">{message}</div>}
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className={`form-control mt-5 custom-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`form-control mt-3 custom-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-5 custom-submit-btn"
                >
                  Submit
                </button>
              </form>
              {/* <div className="mt-3">
                Don't have an account ?{" "}
                <span>
                  <Link to="/sign-up">Click Here</Link>
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

