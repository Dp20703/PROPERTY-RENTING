import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Common/Banner";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";

const About = () => {
  return (
    <div>
      <Header />
      <Banner title="About Us" pageName="About" />
      <AboutSection />
      <FeatureSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="w3l-index1" id="about">
      <div className="calltoaction-20 py-5">
        <div className="container py-md-3">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="assets/images/g15.jpg"
                className="img-fluid"
                alt="Rental Property"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-5">
              <h4>About Our Rental Services</h4>
              <h3>Find Your Perfect Rental Home</h3>
              <p>
                We provide top-quality rental properties to ensure comfort,
                affordability, and convenience. Whether you’re looking for a
                city apartment, a suburban home, or a short-term rental, we have
                options to fit your needs.
              </p>
              <Link id="link" to="/services" className="theme-button btn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: "fa-home",
      title: "Find Rentals Easily",
      description:
        "Search for rental properties anytime, anywhere with our easy-to-use platform.",
    },
    {
      icon: "fa-user",
      title: "Expert Rental Services",
      description: "We help you find the perfect rental based on your needs.",
    },
    {
      icon: "fa-key",
      title: "Secure & Hassle-Free Rentals",
      description:
        "We ensure smooth rental agreements, fair pricing, and a secure process.",
    },
  ];

  return (
    <section className="grids-1">
      <div className="grids py-5">
        <div className="container py-md-3">
          <div className="heading text-center mx-auto">
            <h3 className="head">Why Choose Us?</h3>
            <p className="my-3 head">
              Enjoy a seamless rental experience with easy search, expert
              guidance, and secure agreements.
            </p>
          </div>
          <div className="row mt-5 pt-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="col-lg-4 col-md-6 mt-4">
      <div className="column text-left">
        <div className="icon-top mb-4">
          <span className={`fa ${icon}`}></span>
        </div>
        <h4>
          <Link id="link" to="/services">
            {title}
          </Link>
        </h4>
        <p>{description}</p>
        <Link id="link" to="/services" className="red">
          View More <span className="fa fa-long-arrow-right"></span>
        </Link>
      </div>
    </div>
  );
};

function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    complaint: "",
  });

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/send_complaint", data);

      toast.success("Message Sent Successfully!!", {
        onClose: () =>
          setData({
            name: "",
            email: "",
            complaint: "",
          }),
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/send_feedback", feedback);

      toast.success("Message Sent Successfully!!", {
        onClose: () =>
          setFeedback({
            name: "",
            email: "",
            rating: 0,
            feedback: "",
          }),
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="w3l-contacts-9-main" id="contact">
      <div className="contacts-9 py-5">
        <div className="container py-md-3">
          <div className="d-flex align-items-center justify-content-between">
          </div>
          <div className="top-map row">
            <div className="map-content-9 col-md-6">
              <h4>Make Complaint</h4>
              <form onSubmit={handleSubmitComplaint}>
                <div className="twice-two">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="form-control"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control mb-2"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>


                <textarea
                  name="complaint"
                  id="complaint"
                  placeholder="Complaint"
                  value={data.complaint}
                  onChange={handleChange}
                  className="form-control  "
                  rows={6}
                  required
                />
                <button type="submit">Register Complaint</button>
              </form>
            </div>
            <div className="map-content-9 col-md-6">
              <h4>Give Feedback</h4>
              <form onSubmit={handleSubmitFeedback}>
                <div className="twice-two">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="form-control"
                    value={feedback.name}
                    onChange={handleFeedbackChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={feedback.email}
                    onChange={handleFeedbackChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <Rating
                  name="rating"
                  value={feedback.rating}
                  onChange={handleFeedbackChange}
                  size="large"
                  precision={1}
                />
                <textarea
                  name="feedback"
                  id="message"
                  placeholder="Feedback Message"
                  value={feedback.feedback}
                  onChange={handleFeedbackChange}
                  className="form-control"
                  required
                />
                <button type="submit">Submit Feedback</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
