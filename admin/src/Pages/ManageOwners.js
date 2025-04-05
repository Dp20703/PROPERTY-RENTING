import React, { useEffect, useState } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const ManageOwners = () => {
  return (
    <>
      <Slider />
      <Navigation />
      <Main />
      <Footer />
    </>
  );
};

function Main() {
  // Sample Owner Data with State
  const [owners, setOwners] = useState([]);

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fetch_all_owner");
      const responseData = response.data.data || [];
      const revesedData = responseData.reverse();
      setOwners(revesedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to handle View action
  const handleView = (owner) => {
    setSelectedOwner(owner);
  };

  // Function to handle Delete action
  const handleDelete = (ownerId) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      setOwners(owners.filter((owner) => owner.id !== ownerId));
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = owners.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(owners.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className="mb-5">
        <div className="page-title">
          <div className="title_left">
            <h3>
              Manage Owners <small>Details</small>
            </h3>
          </div>
        </div>
        <div className="clearfix" />
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>Owners List</h2>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                {owners.length === 0 ? (
                  <p>No owners available.</p>
                ) : (
                  <>
                    <p>List of all property owners.</p>
                    <table className="table table-striped projects">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Owner</th>
                          <th>Email</th>
                          <th>Contact</th>
                          {/* <th>Properties Owned</th> */}
                          {/* <th>Status</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.map((owner, index) => (
                          <tr key={owner.id}>
                            <td>{index + 1}</td>
                            <td>
                              {/* <img
                                src={owner.avatar}
                                className="rounded-circle"
                                alt="Owner Avatar"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }}
                              /> */}
                              {owner.firstName} {owner.lastName}
                            </td>
                            <td>{owner.email}</td>
                            <td>{owner.phoneNo}</td>
                            {/* <td>{owner.propertiesOwned}</td> */}
                            {/* <td>
                              <span
                                className={`badge ${
                                  owner.status === "Active"
                                    ? "bg-green"
                                    : "bg-red"
                                }`}
                              >
                                {owner.status}
                              </span>
                            </td> */}
                            <td>
                              <button
                                className="btn btn-xs btn-primary m-1"
                                onClick={() => handleView(owner)}
                              >
                                <i className="fa fa-eye" /> View
                              </button>
                              <button
                                className="btn btn-xs btn-danger m-1"
                                onClick={() => handleDelete(owner.id)}
                              >
                                <i className="fa fa-trash" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <span>
                        Showing {indexOfFirstRecord + 1} to{" "}
                        {Math.min(indexOfLastRecord, owners.length)} of{" "}
                        {owners.length} entries
                      </span>
                      <ul className="pagination mb-0">
                        {[...Array(totalPages).keys()].map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page + 1 ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page + 1)}
                          >
                            <button className="page-link">{page + 1}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Owner Modal */}
      {selectedOwner && (
        <div className="modal-overlay" style={{ marginBottom: "70px" }}>
          <div className="modal-content px-5 py-3">
            <h3 className="pb-2">Owner Details</h3>
            <img
              src={selectedOwner.avatar}
              className="rounded-circle mb-3"
              alt="Owner Avatar"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <p>
              <strong>ID:</strong> {selectedOwner._id}
            </p>
            <p>
              <strong>Name:</strong> {selectedOwner.firstName}{" "}
              {selectedOwner.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOwner.email}
            </p>
            <p>
              <strong>Contact:</strong> {selectedOwner.phoneNo}
            </p>
            {/* <p>
              <strong>Properties Owned:</strong> {selectedOwner.propertiesOwned}
            </p>
            <p>
              <strong>Status:</strong> {selectedOwner.status}
            </p> */}

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedOwner(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOwners;
