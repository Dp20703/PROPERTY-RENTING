import React, { useEffect, useState } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const Payments = () => {
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
  // Sample payment data with userId, propertyId, and ownerId
  const [payments, setPayments] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(null); // For viewing payment details

  // eslint-disable-next-line
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Handle status filter change
  // const handleFilterChange = (e) => {
  //   setFilterStatus(e.target.value);
  // };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to mark payment as completed
  const handleMarkCompleted = (id) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: "Completed" } : payment
      )
    );
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_payment"
      );
      const responseData = response.data.payments || [];
      const revesedData = responseData.reverse();
      setPayments(revesedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filtered payments based on status and search
  // const filteredPayments = payments.filter((payment) => {
  //   return (
  //     (filterStatus === "All" || payment.status === filterStatus) &&
  //     (payment.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       payment.amount
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase()) ||
  //       payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       payment.status.toLowerCase().includes(searchQuery.toLowerCase()))
  //   );
  // });
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = payments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(payments.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
        <div className="mb-5">
          <div className="page-title">
            <div className="title_left">
              <h3>Manage Payments</h3>
            </div>
            {/* <div className="title_right">
              <div className="col-md-5 col-sm-5 form-group pull-right top_search">
                <div className="d-flex flex-column justify-content-center">
                  <label className="ml-2" htmlFor="search-payment">
                    Search by
                  </label>
                  <input
                    id="search-payment"
                    type="text"
                    className="form-control"
                    style={{ fontSize: "15px" }}
                    placeholder="Property, User, Transaction, or Owner..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="clearfix" />

          {/* Status Filter */}
          {/* <div className="row">
            <div className="col-md-4">
              <label>Filter by Status:</label>
              <select className="form-control" onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div> */}

          {/* Payments Table */}
          <div className="row">
            <div className="col-md-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2>Payments List</h2>
                  <div className="clearfix" />
                </div>
                <div className="x_content">
                  <table className="table table-striped projects">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>User</th>
                        <th>Property</th>
                        <th>Owner</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No payments found.
                          </td>
                        </tr>
                      ) : (
                        currentRecords.map((payment, index) => (
                          <tr key={payment.id}>
                            <td>{index + 1}</td>
                            <td>{payment.transactionId}</td>
                            <td>
                              {payment.userName} ({payment.user_Id})
                            </td>
                            <td>
                              {payment.propertyName} ({payment.property_Id})
                            </td>
                            <td>
                              {payment.ownerName} ({payment.owner_Id})
                            </td>
                            <td>₹{payment.amount}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>
                              {new Date(payment.paymentDate).toLocaleString()}
                            </td>
                            <td>
                              <span
                                className={`p-1 badge ${
                                  payment.status === "Pending"
                                    ? "bg-warning"
                                    : payment.status === "Completed"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setSelectedPayment(payment)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between align-items-center p-5">
                    <span>
                      Showing {indexOfFirstRecord + 1} to{" "}
                      {Math.min(indexOfLastRecord, currentRecords.length)} of{" "}
                      {payments.length} entries
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
              </div>
            </div>
          </div>
        </div>

        {/* View Payment Modal */}
        {selectedPayment && (
          <div className="modal-overlay" style={{ marginBottom: "70px" }}>
            <div className="modal-content px-5 py-3">
              <h3 className="pb-2">Payment Details</h3>
              <p>
                <strong>Transaction ID:</strong> {selectedPayment.transactionId}
              </p>
              <p>
                <strong>User:</strong> {selectedPayment.userName} (
                {selectedPayment.user_Id})
              </p>
              <p>
                <strong>Property:</strong> {selectedPayment.propertyName} (
                {selectedPayment.property_Id})
              </p>
              <p>
                <strong>Owner:</strong> {selectedPayment.ownerName} (
                {selectedPayment.owner_Id})
              </p>
              <p>
                <strong>Amount:</strong> ${selectedPayment.amount}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedPayment.paymentMethod}
              </p>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payments;
