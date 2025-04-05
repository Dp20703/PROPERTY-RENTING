import React, { useEffect, useState } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const Complaints = () => {
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
  // Sample complaints
  const [complaints, setComplaints] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_complaint"
      );
      const responseData = response.data.data || [];
      const revesedData = responseData.reverse();
      setComplaints(revesedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Admin response & status update states
  const [responses, setResponses] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});
  const [selectedUser, setSelectedUser] = useState(null); // Modal state

  // Handle response input change
  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Handle submitting a response
  const handleResponseSubmit = async (complaintId) => {
    try {
      const responseMessage = responses[complaintId] || "";

      if (!responseMessage.trim()) {
        alert("Response message cannot be empty.");
        return;
      }

      await axios.post("http://localhost:8000/respond_complaint", {
        complaintId,
        responseMessage,
      });

      alert("Response sent successfully!");

      // Refresh complaints after response submission
      getData();
    } catch (error) {
      console.error("Error sending response:", error);
      alert("Failed to send response.");
    }
  };

  // Handle status update change
  const handleStatusChange = (id, value) => {
    setStatusUpdates({ ...statusUpdates, [id]: value });
  };

  // Handle updating complaint status
  const handleStatusUpdate = (id) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: statusUpdates[id] || complaint.status }
          : complaint
      )
    );
  };

  // Open user profile modal
  const handleViewAccount = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className="mb-5">
        <div className="page-title">
          <div className="title_left">
            <h3>Manage Complaints</h3>
          </div>
        </div>
        <div className="clearfix" />

        {/* Complaints List */}
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>User Complaints</h2>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                {complaints.length === 0 ? (
                  <p>No complaints available.</p>
                ) : (
                  complaints.map((complaint) => (
                    <div key={complaint.id} className="well">
                      <h4>{complaint.name}</h4>
                      <p>
                        <strong>Email:</strong> {complaint.email}
                      </p>
                      <p>
                        <strong>Complaint:</strong> {complaint.complaint}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`badge ${
                            complaint.status === "Pending"
                              ? "bg-warning"
                              : complaint.status === "Resolved"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </p>

                      {/* Admin Response Section */}
                      {complaint.response ? (
                        <p>
                          <strong>Admin Response:</strong> {complaint.response}
                        </p>
                      ) : (
                        <div>
                          <textarea
                            className="form-control"
                            placeholder="Write a response..."
                            value={responses[complaint._id] || ""}
                            onChange={(e) =>
                              handleResponseChange(
                                complaint._id,
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => handleResponseSubmit(complaint._id)}
                          >
                            Submit Response
                          </button>
                        </div>
                      )}

                      {/* Status Update Section */}
                      {/* <div className="mt-3">
                        <select
                          className="form-control d-inline w-auto"
                          value={
                            statusUpdates[complaint.id] || complaint.status
                          }
                          onChange={(e) =>
                            handleStatusChange(complaint.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <button
                          className="btn btn-info btn-sm ml-2"
                          onClick={() => handleStatusUpdate(complaint.id)}
                        >
                          Update Status
                        </button>
                      </div> */}

                      {/* View Account Button */}
                      {/* <div className="mt-3">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleViewAccount(complaint)}
                        >
                          View Account
                        </button>
                      </div> */}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Account Modal */}
      {selectedUser && (
        <div className="modal-overlay" style={{ marginBottom: "70px" }}>
          <div className="modal-content px-5 py-3">
            <h3>User Account Details</h3>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;
