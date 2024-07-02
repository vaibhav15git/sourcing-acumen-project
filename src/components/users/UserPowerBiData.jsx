import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserPowerBiData.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={
              "https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png"
            }
            alt=""
            style={{ width: "30px" }}
          />
          <h6 className="ms-2">Resourcing Acumen</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large">
            <Link to="/user-dashboard">Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="fa-solid fa-upload">
            <Link to="/user-upload-files">Upload Data</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/user-power-bi-data">View Data</Link>
          </CDBSidebarMenuItem> */}
          <CDBSidebarMenuItem icon="fa-solid fa-server">
            <Link to="/user-uploaded-data">Data</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem icon="fa-solid fa-database">
            <Link to="/users-column-mapping">Column Mapping</Link>
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

const UserPowerBiData = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div style={{ height: "100vh" }} className="flex-grow-1">
          <div className="container-fluid mt-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="mb-3">
                  <h3 className="card-title fw-bold">Hotel Data</h3>
                </div>
              </div>
            </div>
            <div className="row" style={{ height: "100vh" }}>
              <div className="col-lg-12">
                <div style={{ height: "100vh" }}>
                  <PowerBIEmbed
                    embedConfig={{
                      type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                      id: "5b218778-e7a5-4d73-8187-f10824047715",
                      embedUrl:
                        "https://app.powerbi.com/reportEmbed?reportId=5b218778-e7a5-4d73-8187-f10824047715&groupId=f089354e-8366-4e18-aea3-4cb4a3a50b48",
                      accessToken: "<Access Token>",
                      tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
                      settings: {
                        panes: {
                          filters: {
                            expanded: false,
                            visible: false,
                          },
                        },
                        background: models.BackgroundType.Transparent,
                      },
                    }}
                    eventHandlers={
                      new Map([
                        [
                          "loaded",
                          function () {
                            console.log("Report loaded");
                          },
                        ],
                        [
                          "rendered",
                          function () {
                            console.log("Report rendered");
                          },
                        ],
                        [
                          "error",
                          function (event) {
                            console.log(event.detail);
                          },
                        ],
                        ["visualClicked", () => console.log("visual clicked")],
                        ["pageChanged", (event) => console.log(event)],
                      ])
                    }
                    cssClassName={"reportClass"}
                    getEmbeddedComponent={(embeddedReport) => {
                      window.report = embeddedReport;
                    }}
                  />
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
                  className="btn btn-primary"
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

export default UserPowerBiData;
