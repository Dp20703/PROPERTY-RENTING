import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import axios from "axios";

const ManagePayments = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

function Main() {
  // Simulating the logged-in owner (In a real-world app, fetch from authentication)
  //eslint-disable-next-line

  //eslint-disable-next-line
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/view_payment");
      setPayments(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchData();
  }, []);

  return (
    <div
      className="container mt-5"
      style={{ minHeight: "90vh", marginBottom: "70px" }}
    >
      <h2 className="text-center mb-4">Payment Records</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Property ID</th>
              <th>Amount (₹)</th>
              <th>Payment paymentDate</th>
              <th>Payment Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment.payment_Id}>
                  <td>{index + 1}</td>
                  <td>{payment._id}</td>
                  <td>{payment.booking_Id}</td>
                  <td>{payment.user_Id}</td>
                  <td>{payment.property_Id}</td>
                  <td>₹{payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.transactionId}</td>
                  <td>
                    <span
                      className={`badge ${
                        payment.status === "Success"
                          ? "badge-success"
                          : payment.status === "Failed"
                          ? "badge-danger"
                          : "badge-warning"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePayments;
