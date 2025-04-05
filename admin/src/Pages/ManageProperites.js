import React, { useState, useEffect } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const ManageProperties = () => {
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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [dataItems, setDataItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Open View Modal
  const handleView = (property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  // Delete Property
  const handleDelete = (propertyId) => {};

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProperty(null);
  };

  // Allow closing modals with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredData = dataItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase()) ||
      item.zipCode.toLowerCase().includes(search.toLowerCase()) ||
      item.propertyType.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_property"
      );
      const responseData = response.data.data || [];
      const revesedData = responseData.reverse();
      setDataItems(revesedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="x_panel">
            <div className="x_title d-flex justify-content-between align-items-center">
              <h2>Properties List</h2>
              {/* Right-aligned search bar */}
              <div className="d-flex justify-content-end">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "250px" }}
                />
              </div>
            </div>
            <div className="x_content">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {currentRecords.length === 0 ? (
                <p className="text-center">No properties available.</p>
              ) : (
                <div>
                  <p>List of all available properties.</p>
                  <table className="table table-striped projects">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((property, index) => (
                        <tr key={property.id}>
                          <td>{index + 1}</td>
                          <td>
                            {/* <img
                              src={property.owner.avatar}
                              className="rounded-circle"
                              alt="Owner Avatar"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                            /> */}
                            {property.title}
                          </td>
                          <td>{property.propertyType}</td>
                          <td>{property.location}</td>
                          <td>{property.price}</td>
                          <td>
                            <span
                              className={`badge ${
                                property.status === "Pending"
                                  ? "bg-danger"
                                  : "bg-success"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-xs btn-primary m-1"
                              onClick={() => handleView(property)}
                            >
                              <i className="fa fa-eye" /> View
                            </button>
                            <button
                              className="btn btn-xs btn-danger m-1"
                              onClick={() => handleDelete(property.id)}
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
                      {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
                      {filteredData.length} entries
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Property Modal */}
      {modalOpen && selectedProperty && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Property Details</h5>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedProperty.title}
                </p>
                <p>
                  <strong>Type:</strong> {selectedProperty.propertyType}
                </p>
                <p>
                  <strong>Location:</strong> {selectedProperty.location}
                </p>
                <p>
                  <strong>Price:</strong> {selectedProperty.price}
                </p>
                <p>
                  <strong>Size:</strong> {selectedProperty.size}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {selectedProperty.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {selectedProperty.bathrooms}
                </p>
                <p>
                  <strong>Status:</strong> {selectedProperty.status}
                </p>
                <p>
                  <strong>Owner:</strong> {selectedProperty.ownerName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProperties;
