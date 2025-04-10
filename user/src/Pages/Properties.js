import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Banner from "../Common/Banner";
import Footer from "../Common/Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Properties = () => {
  return (
    <div>
      <Header />
      <Banner title={"Our Properties"} pageName={"properties"} />
      <Main />
      <Footer />
    </div>
  );
};

const Main = () => {
  const location = useLocation();
  const [propertiesData, setPropertiesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/fetch_all_property"
      );
      setPropertiesData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });

    const data = location.state;
    console.log(data);

    fetchData();
  }, [location.state]);

  return (
    <section
      className="grids-3 m-auto"
      id="properties"
      style={{ width: "75%" }}
    >
      <div id="grids3-block" className="py-5">
        <div className="container py-md-3">
          <div className="row">
            {propertiesData.map((property, index) => (
              <div className="grids3-info col-lg-4 col-md-6 mt-5" key={index}>
                <Link id="link" to="/properties_single" state={property}>
                  <img
                    src={`http://localhost:8000/images/propertyImg/${property?.images[0]}`}
                    className="img-fluid"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt={property?.title}
                  />
                </Link>
                <p>Rent</p>
                <div className="info-bg">
                  <h5>
                    <Link id="link" to="/properties_single" state={property}>
                      {property?.title}, {property?.location}
                    </Link>
                  </h5>
                  <ul>
                    <li>
                      <span className="fa fa-bed"></span> {property?.bedrooms}{" "}
                      bedrooms
                    </li>
                    <li>
                      <span className="fa fa-bath"></span> {property?.bathrooms}{" "}
                      bathrooms
                    </li>
                    <li>
                      <span className="fa fa-share-square-o"></span>{" "}
                      {property?.size} sq ft
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
