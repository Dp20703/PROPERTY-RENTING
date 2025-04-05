import React, { useEffect, useState } from "react";
import Slider from "../Common/Slider";
import Navigation from "../Common/Navigation";
import Footer from "../Common/Footer";
import axios from "axios";

const Feedback = () => {
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
  // Sample feedback list
  const [feedbacks, setFeedbacks] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_feedback"
      );
      const responseData = response.data.data || [];
      const revesedData = responseData.reverse();
      setFeedbacks(revesedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Admin response state
  const [responses, setResponses] = useState({});

  // Profile Modal state
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Handle response input change
  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Handle submitting a response
  const handleResponseSubmit = async (id) => {
    const responseMessage = responses[id];

    if (!responseMessage) {
      alert("Response cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/respond_feedback", {
        feedbackId: id,
        responseMessage,
      });

      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback._id === id
            ? { ...feedback, response: responseMessage, status: "Resolved" }
            : feedback
        )
      );

      setResponses({ ...responses, [id]: "" });
      alert("Response sent successfully!");
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Failed to send response. Please try again.");
    }
  };

  // Open user profile modal
  const handleViewProfile = (user) => {
    setSelectedProfile(user);
  };

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className=" mb-5">
        <div className="page-title">
          <div className="title_left">
            <h3>User Feedback</h3>
          </div>
        </div>
        <div className="clearfix" />

        {/* Feedback List */}
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>Feedback from Users</h2>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                {feedbacks.length === 0 ? (
                  <p>No feedback available.</p>
                ) : (
                  feedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="well d-flex align-items-center"
                    >
                      {/* User Image */}
                      {/* <div className="mr-3 text-center">
                        <img
                          src={feedback.avatar}
                          className="rounded-circle"
                          alt="User Avatar"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <br />
                        <button
                          className="btn btn-primary btn-sm mt-2"
                          onClick={() => handleViewProfile(feedback)}
                        >
                          View Profile
                        </button>
                      </div> */}

                      {/* Feedback Details */}
                      <div className="flex-grow-1">
                        <h4>
                          {feedback.name}
                          {/* <small>({feedback.role})</small> */}
                        </h4>
                        <p>
                          <strong>Email:</strong> {feedback.email}
                        </p>
                        <p>
                          <strong>Message:</strong> {feedback.message}
                        </p>
                        <p>
                          <strong>Rating:</strong>{" "}
                          {"⭐".repeat(feedback.rating)}{" "}
                        </p>

                        {/* Admin Response Section */}
                        {feedback.response ? (
                          <p>
                            <strong>Admin Response:</strong> {feedback.response}
                          </p>
                        ) : (
                          <div>
                            <textarea
                              className="form-control"
                              placeholder="Write a response..."
                              value={responses[feedback._id] || ""}
                              onChange={(e) =>
                                handleResponseChange(
                                  feedback._id,
                                  e.target.value
                                )
                              }
                            />
                            <button
                              className="btn btn-primary btn-sm mt-2"
                              onClick={() => handleResponseSubmit(feedback._id)}
                            >
                              Submit Response
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="modal-overlay" style={{ marginBottom: "70px" }}>
          <div className="modal-content px-5 py-3">
            <h3>User Profile</h3>
            <img
              src={selectedProfile.avatar}
              className="rounded-circle mb-3"
              alt="User Avatar"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <p>
              <strong>Name:</strong> {selectedProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedProfile.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedProfile.role}
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedProfile(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
