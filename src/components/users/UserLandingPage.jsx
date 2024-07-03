import React, { useState } from 'react'
import logo from "./Logo.jpg"
import "./UserLandingPage.css"
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';


const UserLandingPage = () => {
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
              <div className="right-side-navbar-first-div">
                <h4>User Center</h4>
              </div>
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

      <div className="landing-page-main-div">
        <div className="d-flex justify-content-center pt-3">
          <Link to="" className="arrow-shape">
            Input Data
          </Link>

          <Link
            to="/user-dashboard"
            className="arrow-shape space-btw text-white"
          >
            <Link to="/user-dashboard" className="text-white">
              View Dashboard
            </Link>
          </Link>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card py-4">
                <div className="card-body text-center ">
                  <h5 className="card-title">Upload 'Table 1'</h5>
                  <i className="fas fa-upload fa-2x mb-2" />
                </div>
                <Button
                  style={{ backgroundColor: "#223244" }}
                  variant=""
                  className="px-5 py-2 w-50 m-auto text-white"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Browse
                </Button>
              </div>
              <p className="card-text text-white mt-3">
                Your have submitted data with X rows and Y columns
              </p>
              <Button className="btn full-width-button py-2 mt-5">
                Preview submitted data
              </Button>
            </div>
            <div className="col-md-4">
              <div className="card py-4">
                <div className="card-body text-center">
                  <h5 className="card-title">Upload 'Table 2'</h5>
                  <i className="fas fa-upload fa-2x mb-2" />
                </div>
                <Button
                  style={{ backgroundColor: "#223244" }}
                  variant=""
                  className="px-5 py-2 w-50 m-auto text-white"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Browse
                </Button>
              </div>
              <p className="card-text text-white mt-3">
                Your have submitted data with X rows and Y columns
              </p>
              <Button className="btn full-width-button py-2 mt-5">
                Preview submitted data
              </Button>
            </div>
            <div className="col-md-4">
              <div className="card">
                <Link
                  to="/choose-variables-page"
                  className="card-body text-center"
                >
                  <h5 className="card-title">Choose variables</h5>
                </Link>
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
}

export default UserLandingPage