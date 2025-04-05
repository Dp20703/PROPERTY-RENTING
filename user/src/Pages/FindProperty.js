import React, { useState } from "react";
import Header from "../Common/Header";
import Banner from "../Common/Banner";
import Footer from "../Common/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FindProperty = () => {
  return (
    <div>
      <Header />
      <Banner title={"Find Your Dream Property"} pageName={"find_property"} />
      <Main />
      <Footer />
    </div>
  );
};

function Main() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    keywords: "",
    maxSqft: "",
    propertyType: "",
    maxBudget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/search_property",
        data
      );
      console.log(response.data.data);
      if (response.data.data.length === 0) {
        toast.error("No properties found");
      }

      navigate("/properties", {
        state: {
          properties: response.data.data,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <section
        className="form-16"
        id="booking"
        style={{ padding: "0px 140px" }}
      >
        <div className="form-16-mian py-5">
          <div className="container py-md-3">
            <div className="forms-16-top">
              <div className="form-right-inf">
                <div className="form-inner-cont">
                  <h3>Find Your Perfect Property</h3>
                  <p className="text-black fw-light mb-4">
                    Search from a wide range of properties to rent in top
                    locations.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="row book-form">
                      <div className="form-input col-lg-12 col-md-6">
                        <input
                          type="text"
                          name="keywords"
                          value={data.keywords}
                          onChange={handleChange}
                          placeholder="Enter property name"
                          required
                        />
                      </div>
                      {/* <div className="form-input col-lg-4 col-md-6 mt-md-0 mt-3">
                        <select className="selectpicker" name="location">
                          <option value="">Select a City</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Jaipur">Jaipur</option>
                          <option value="Pune">Pune</option>
                        </select>
                      </div> */}
                      <div className="form-input col-md-4 mt-3">
                        <input
                          type="number"
                          name="maxSqft"
                          value={data.maxSqft}
                          onChange={handleChange}
                          placeholder="Maximum Area (sqft)"
                          required
                        />
                      </div>
                      <div className="form-input col-md-4 mt-3">
                        <select
                          className="selectpicker"
                          name="propertyType"
                          onChange={handleChange}
                          required
                          value={data.propertyType}
                        >
                          <option value="">Select Property Type</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial Property">
                            Commercial
                          </option>
                        </select>
                      </div>

                      <div className="form-input col-md-4 mt-3">
                        <input
                          type="number"
                          name="maxBudget"
                          value={data.maxBudget}
                          onChange={handleChange}
                          placeholder="Maximum Budget (₹)"
                          required
                        />
                      </div>
                      <div className="bottom-btn col-md-4 mt-3">
                        <button type="submit" className="btn">
                          Search Properties
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FindProperty;
