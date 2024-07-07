import React from 'react'
import "./UserNavbar.css"
import { CgProfile } from 'react-icons/cg';
import { FaGear } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import logo from "./Logo.png"

const UserNavbar = () => {
  const username = localStorage.getItem('username');
    const firstLetter = username ? username.charAt(0).toUpperCase() : "U";

  // console.log(username)
  // console.log(firstLetter);
  return (
    <>
      <nav>
        <div className="navbar-logo">
          <div className="d-flex justify-content-between">
            <div className="w-50 remove-logo">
              {" "}
              <img src={logo} alt="" />
            </div>
            <div className="right-side-main-div">
              <div className=" float-end me-4 mt-3">
                <div className="dropdown ">
                  <button
                    className="btn rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      background: "#223244",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {firstLetter}
                  </button>
                  <span style={{ fontSize: "12px" }} className="mx-1">
                    {username}
                  </span>
                  <ul className="dropdown-menu menu-edit shadow-lg">
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="me-3">
                          <CgProfile />
                        </span>
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="me-3">
                          <FaGear />
                        </span>
                        Setting
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-danger"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#logout-modal"
                      >
                        <span className="me-3">
                          <IoIosLogOut />
                        </span>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="navy-strip"></div>
          <div className="gradient-strip"></div>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar