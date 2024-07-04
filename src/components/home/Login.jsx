// import React, { useState } from "react";
// import "./Login.css";
// import logo from "../home/Logo.jpg";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [showCategory, setShowCategory] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categorySelected, setCategorySelected] = useState(false);
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
//     }
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           "https://testsignuplogin.onrender.com/login",
//           { email, password }
//         );
//         const { token, user } = response.data;

//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", user.id);

//         if (user.role === "user") {
//           toast.success("Login successful! Please select a category.");
//           setShowCategory(true);
//         } else if (user.role === "admin") {
//           navigate("/dashboard");
//         } else {
//           toast.error("Unknown role");
//         }
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

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setCategorySelected(e.target.value !== "");
//   };

//   return (
//     <div className="login-main">
//       <div className="containerr shadow-lg ">
//         <form className="row g-5 width-edit" onSubmit={handleSubmit}>
//           <div className="logo-img">
//             <img src={logo} alt="Logo" />
//           </div>

//           <div className="col-md-12">
//             <label htmlFor="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="email"
//               className=""
//               id="inputEmail4"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <div className="col-md-12">
//             <label htmlFor="inputPassword4" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               className=""
//               id="inputPassword4"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//           </div>

//           <div className="col-12 btn-edit">
//             <button type="submit" className="btn btn-primary">
//               Sign in
//             </button>
//           </div>

//           {showCategory && (
//             <div className="row ms-1 mt-4">
//               <div className="col-12 col-lg-6 mb-3 mb-lg-0">
//                 <select
//                   className="form-select bg-danger-subtle rounded-1 border-0 py-2 px-2"
//                   value={selectedCategory}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">Select a category</option>
//                   <option value="tech">Tech</option>
//                   <option value="news">News</option>
//                   <option value="hotels">Hotels</option>
//                 </select>
//               </div>
//               {categorySelected && (
//                 <div className="col-12 col-lg-6 d-flex justify-content-lg-end">
//                   <button
//                     onClick={() => {
//                       navigate("/user-dashboard", {
//                         state: { category: selectedCategory },
//                       });
//                     }}
//                     className="btn bg-danger-subtle w-100 w-lg-auto py-2"
//                     type="button"
//                   >
//                     Go to Dashboard
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </form>
//         {message && <p className="error">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

// -----------------------------------------------------

// import React, { useState } from "react";
// import "./Login.css";
// import logo from "../home/Logo.jpg";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [showCategory, setShowCategory] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categorySelected, setCategorySelected] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [userCategory, setUserCategory] = useState(""); // New state for user's category
//   const navigate = useNavigate();

//   const fetchCategories = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("https://testsignuplogin.onrender.com/login/data", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load categories");
//       });
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (!password) {
//       errors.password = "Password is required";
//     }
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           "https://testsignuplogin.onrender.com/login",
//           { email, password }
//         );
//         const { token, user } = response.data;

//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", user.id);

//         if (user.role === "user") {
//           setUserCategory(user.category); // Set the user's category
//           toast.success("Login successful! Please select a category.");
//           setShowCategory(true);
//           fetchCategories(token);
//         } else if (user.role === "admin") {
//           toast.success("Login successful!");
//           navigate("/dashboard");
//         } else {
//           toast.error("Unknown role");
//         }
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

//   const handleCategoryChange = (e) => {
//     const selectedCat = e.target.value;
//     setSelectedCategory(selectedCat);
//     if (selectedCat === userCategory) {
//       setCategorySelected(true);
//     } else {
//       setCategorySelected(false);
//       toast.error("Selected category does not match your assigned category.");
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div className="navbar-logo">
//           <img src={logo} alt="" />
//           <div className="navy-strip"></div>
//           <div className="gradient-strip"></div>
//         </div>
//       </nav>
//       <div className="main-body">
//         <div className="company-name">
//           <h1>Sourcing Acumen</h1>
//         </div>
//         <div className="login-main">
//           <div className="containerr shadow-lg ">
//             <form className="row g-5 width-edit" onSubmit={handleSubmit}>
//               <div className="col-md-12">
//                 <label htmlFor="inputEmail4" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="username"
//                   className=""
//                   id="inputEmail4"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}
//               </div>
//               <div className="col-md-12">
//                 <label htmlFor="inputPassword4" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="password"
//                   className=""
//                   id="inputPassword4"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 {errors.password && <p className="error">{errors.password}</p>}
//               </div>

//               <div className="col-12 btn-edit">
//                 <button type="submit" className="btn btn-primary">
//                   Sign in
//                 </button>
//               </div>

//               {showCategory && (
//                 <div className="row ms-1 mt-4">
//                   <div className="col-12 col-lg-6 mb-3 mb-lg-0">
//                     <select
//                       className="form-select bg-danger-subtle rounded-1 border-0 py-2 px-2"
//                       value={selectedCategory}
//                       onChange={handleCategoryChange}
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((user) => (
//                         <option key={user.id} value={user.category}>
//                           {user.category}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {categorySelected && (
//                     <div className="col-12 col-lg-6 d-flex justify-content-lg-end">
//                       <button
//                         onClick={() => {
//                           if (selectedCategory === userCategory) {
//                             navigate("/user-dashboard", {
//                               state: { category: selectedCategory },
//                             });
//                           } else {
//                             toast.error(
//                               "Please select your assigned category."
//                             );
//                           }
//                         }}
//                         className="btn bg-danger-subtle w-100 w-lg-auto py-2"
//                         type="button"
//                       >
//                         Go to Dashboard
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </form>
//             {message && <p className="error">{message}</p>}
//           </div>
//         </div>
//       </div>
      
//     </>
//   );
// };

// export default Login;

// ----------------------------------------

import React, { useState } from "react";
import "./Login.css";
import logo from "../home/Logo.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState("");
  const navigate = useNavigate();

  const fetchCategories = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://testsignuplogin.onrender.com/login/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      });
  };

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
          { email, password }
        );
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);

        if (user.role === "user") {
          setUserCategory(user.category);
          toast.success("Login successful! Please select a category.");
          setShowLoginForm(false);
          setShowCategory(true);
          fetchCategories(token);
        } else if (user.role === "admin") {
          toast.success("Login successful!");
          navigate("/dashboard");
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

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    if (selectedCat === userCategory) {
      setCategorySelected(true);
    } else {
      setCategorySelected(false);
      toast.error("Selected category does not match your assigned category.");
    }
  };

  return (
    <>
      <nav>
        <div className="navbar-logo">
          <img src={logo} alt="" />
          <div className="navy-strip"></div>
          <div className="gradient-strip"></div>
        </div>
      </nav>
      <div className="main-body">
        <div className="company-name">
          <h1>Sourcing Acumen</h1>
        </div>
        <div className="login-main">
          <div className="containerr shadow-lg ">
            {showLoginForm && (
              <form className="row g-5 width-edit" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Username
                  </label>
                  <input
                    type="email"
                    placeholder="username"
                    className=""
                    id="inputEmail4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className=""
                    id="inputPassword4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className="col-12 btn-edit">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            )}

            {showCategory && (
              <div className="row ms-1 mt-4 select-cat-div py-5 h-75">
                <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                  <select
                    className="form-select rounded-0 border-0 py-2 px-2 select-cat-section"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map((user) => (
                      <option
                        className="bg-light text-black"
                        key={user.id}
                        value={user.category}
                      >
                        {user.category}
                      </option>
                    ))}
                  </select>
                </div>
                {categorySelected && (
                  <div
                    style={{ height: "min-content" }}
                    className="col-12 col-lg-6 d-flex  justify-content-lg-end"
                  >
                    <button
                      onClick={() => {
                        if (selectedCategory === userCategory) {
                          navigate("/user-landing-page", {
                            state: { category: selectedCategory },
                          });
                        } else {
                          toast.error("Please select your assigned category.");
                        }
                      }}
                      className="btn w-100 w-lg-auto py-2 click-here-btn"
                      type="button"
                    >
                      Click Here to Continue
                    </button>
                  </div>
                )}
              </div>
            )}
            {message && <p className="error">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
