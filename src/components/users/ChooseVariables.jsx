import React from "react";
import logo from "./Logo.jpg";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./ChooseVariables.css";

const ChooseVariables = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <>
      <nav>
        <div className="navbar-logo">
          <div className="d-flex justify-content-between">
            <div className="w-50 remove-logo">
              {" "}
              <img src={logo} alt="" />
            </div>
            <div className="d-flex justify-content-evenly right-side-main-div">
              {/* <div className="right-side-navbar-first-div">
                <h4>User Center</h4>
              </div> */}
              <div
                className="right-side-navbar-second-div"
                data-bs-toggle="modal"
                data-bs-target="#logout-modal"
              >
                <h3>VJ</h3>
              </div>
            </div>
          </div>
          <div className="navy-strip"></div>
          <div className="gradient-strip"></div>
        </div>
      </nav>

      <div className="choose-variable-main-div">
        <span className=" d-flex float-end mt-3 me-4">
          <Link to="/user-landing-page" className="btn py-2 px-4 bg-light ">
            Back
          </Link>
        </span>
        <div className="d-flex justify-content-center pt-3">
          <Link to="/user-landing-page" className="button-link">
            <button className="button">
              <span className="button-content">Input Data</span>
            </button>
          </Link>

          <Link to="/user-dashboard" className="button-link">
            <button className="button">
              <span className="button-content">View Dashboard</span>
            </button>
          </Link>
        </div>

        <div className="choose-variables-data-div">
          <div className="row ms-5">
            <div className="col-md-2 btn bg-light ">Choose a Variables</div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="container text-center overflow-container">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 1
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 1
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 2
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 2
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 3
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 3
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 4
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 4
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 5
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 5
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 6
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 6
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 7
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 7
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 8
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 8
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 9
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 9
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 10
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 10
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 11
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 11
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 12
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 12
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 13
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 13
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 14
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 14
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 15
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 15
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 16
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 16
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 17
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 17
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 18
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 18
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 19
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 19
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 20
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 20
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="container text-center overflow-container">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 1
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 1
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 2
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 2
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 3
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 3
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 4
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 4
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 5
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 5
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 6
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 6
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 7
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 7
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 8
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 8
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 9
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 9
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 10
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 10
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 11
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 11
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 12
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 12
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 13
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 13
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 14
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 14
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 15
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 15
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 16
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 16
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 17
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 17
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 18
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 18
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 19
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 19
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <button className="py-2 px-5 variable-btn">
                        Variable 20
                      </button>
                    </div>
                    <div className="col-md-4 offset-md-2">
                      <button className="py-2 px-5 rounded-3 response-btn">
                        Response 20
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default ChooseVariables;
