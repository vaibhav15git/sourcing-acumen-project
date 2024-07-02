import axios from "axios";
import React, { useState } from "react";
import "./SignUpPage.css"; // Import the CSS file

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [userList, setUserList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    axios
      .post("https://excel-mysql.onrender.com/api/createusers", formData)
      .then((response) => {
        console.log(response.data);
        setUserList([...userList, formData]);
        setFormData({
          role: "",
          email: "",
          password: "",
          name: "",
          category: "",

        });
        setSubmitting(false);
        // localStorage.setItem("role", role);

      })
      .catch((error) => {
        setError(error.message);
        setSubmitting(false);
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <>
      <div className="sign-up-background">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg sign-up-from p-4 ">
                <div className="card-header text-center text-black ">
                  <h1 className="fs-5 fw-bold">Create an Account</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
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
                        placeholder="Email"
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
                        placeholder="Password"
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
                        placeholder="Role"
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
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-info px-5 py-2"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
