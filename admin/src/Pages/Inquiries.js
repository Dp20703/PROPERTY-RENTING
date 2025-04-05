import React, { useEffect, useState } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const Inquiries = () => {
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
  // Sample inquiries
  const [inquiries, setInquiries] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_inquiry"
      );
      const responseData = response.data.data || [];
      const revesedData = responseData.reverse();
      setInquiries(revesedData);
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
  const [loading, setLoading] = useState({});

  //eslint-disable-next-line
  const [selectedInquiry, setSelectedInquiry] = useState(null); // Modal state

  // Handle response input change
  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Handle submitting a response
  const handleResponseSubmit = async (id) => {
    if (!responses[id]) {
      alert("Please write a response before submitting.");
      return;
    }

    setLoading({ ...loading, [id]: true });

    try {
      const res = await axios.post("http://localhost:8000/respond_contactus", {
        contactId: id,
        responseMessage: responses[id],
      });

      if (res.status === 200) {
        setInquiries(
          inquiries.map((inquiry) =>
            inquiry._id === id
              ? { ...inquiry, response: responses[id], status: "Resolved" }
              : inquiry
          )
        );
        setResponses({ ...responses, [id]: "" });
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Failed to send response. Please try again.");
    }

    setLoading({ ...loading, [id]: false });
  };

  // Handle status update change
  const handleStatusChange = (id, value) => {
    setStatusUpdates({ ...statusUpdates, [id]: value });
  };

  // Handle updating inquiry status
  const handleStatusUpdate = (id) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, status: statusUpdates[id] || inquiry.status }
          : inquiry
      )
    );
  };

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className="mb-5">
        <div className="page-title">
          <div className="title_left">
            <h3>Manage Contact Inquiries</h3>
          </div>
        </div>
        <div className="clearfix" />

        {/* Inquiries List */}
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>User Inquiries</h2>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                {inquiries.length === 0 ? (
                  <p>No inquiries available.</p>
                ) : (
                  inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="well">
                      <h4>{inquiry.name}</h4>
                      <p>
                        <strong>Email:</strong> {inquiry.email}
                      </p>
                      <p>
                        <strong>Subject:</strong> {inquiry.subject}
                      </p>
                      <p>
                        <strong>Message:</strong> {inquiry.message}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`badge ${
                            inquiry.status === "Pending"
                              ? "bg-warning"
                              : inquiry.status === "Resolved"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </p>

                      {/* Admin Response Section */}
                      {inquiry.response ? (
                        <p>
                          <strong>Admin Response:</strong> {inquiry.response}
                        </p>
                      ) : (
                        <div>
                          <textarea
                            className="form-control"
                            placeholder="Write a response..."
                            value={responses[inquiry._id] || ""}
                            onChange={(e) =>
                              handleResponseChange(inquiry._id, e.target.value)
                            }
                          />
                          <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => handleResponseSubmit(inquiry._id)}
                            disabled={loading[inquiry._id]}
                          >
                            {loading[inquiry._id]
                              ? "Sending..."
                              : "Submit Response"}
                          </button>
                        </div>
                      )}

                      {/* Status Update Section */}
                      {/* <div className="mt-3">
                        <select
                          className="form-control d-inline w-auto"
                          value={statusUpdates[inquiry.id] || inquiry.status}
                          onChange={(e) =>
                            handleStatusChange(inquiry.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        <button
                          className="btn btn-info btn-sm ml-2"
                          onClick={() => handleStatusUpdate(inquiry.id)}
                        >
                          Update Status
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
    </div>
  );
}

export default Inquiries;
