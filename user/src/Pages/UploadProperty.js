import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UploadProperty = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

function Main() {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    zipCode: "",
    propertyType: "",
    category: "For Rent",
    size: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    images: [],
    propertyIdentityType: "",
    propertyProof: "",
    amenities: [],
    identityType: "",
    identityId: "",
  });

  const amenitiesList = [
    "Air Conditioning",
    "Swimming Pool",
    "Gym",
    "Parking",
    "Balcony",
    "Security",
    "Garden",
    "Power Backup",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handlePropertyProofChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, propertyProof: file });
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: checked
        ? [...prevData.amenities, value]
        : prevData.amenities.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    const submitData = new FormData();

    // Append all text fields
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("location", formData.location);
    submitData.append("address", formData.address);
    submitData.append("zipCode", formData.zipCode);
    submitData.append("propertyType", formData.propertyType);
    submitData.append("category", formData.category);
    submitData.append("size", formData.size);
    submitData.append("price", formData.price);
    submitData.append("bedrooms", formData.bedrooms);
    submitData.append("bathrooms", formData.bathrooms);
    submitData.append("propertyIdentityType", formData.propertyIdentityType);
    submitData.append("identityType", formData.identityType);
    submitData.append("identityId", formData.identityId);

    // Append amenities array as JSON string
    submitData.append("amenities", JSON.stringify(formData.amenities));

    // Append multiple image files
    formData.images.forEach((file) => {
      submitData.append("images", file);
    });

    // Append single property proof image
    if (formData.propertyProof) {
      submitData.append("propertyProof", formData.propertyProof);
    }

    try {
      await axios.post("http://localhost:8000/upload_property", submitData);
      // setMessage("Property has been uploaded Successfully");

      toast.success("Property Added Successfully", {
        onClose: navigate("/view_property"),
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error uploading property:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Upload Property</h2>
      {message && <p className="alert alert-success">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-white"
      >
        <div className="row">
          {/* Property Details */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Property Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter property title"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Enter property details"
                rows="4"
                required
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group mt-3">
              <label>City:</label>
              <input
                type="text"
                name="location"
                placeholder="Enter city"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter full address"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>ZIP Code:</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Enter ZIP Code"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Property Specifications */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Property Type:</label>
              <select
                name="propertyType"
                required
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial Property">Commercial Property</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label>Category:</label>
              <p name="category" value="For Rent" className="form-control">
                For Rent
              </p>
            </div>
            {/* 
            <div className="form-group mt-3">
              <label>Category:</label>
              <select name="category" required onChange={handleChange} className="form-control">
                <option value="">Select Category</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div> */}

            <div className="form-group mt-3">
              <label>Size (sq ft):</label>
              <input
                type="number"
                name="size"
                placeholder="Enter size in sqft"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>Price (₹):</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>Bedrooms:</label>
              <input
                type="number"
                name="bedrooms"
                placeholder="Enter number of bedrooms"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label>Bathrooms:</label>
              <input
                type="number"
                name="bathrooms"
                placeholder="Enter number of bathrooms"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        {/* Upload Images */}
        <div className="form-group mt-3">
          <label>Upload Property Images:</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            required
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {/* Property Identity Type */}
        <div className="form-group mt-3">
          <label>Property Identity Type:</label>
          <select
            name="propertyIdentityType"
            required
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Property Proof Type</option>
            <option value="Sale Deed">Sale Deed</option>
            <option value="Property Tax Receipt">Property Tax Receipt</option>
            <option value="Agreement Copy">Agreement Copy</option>
            <option value="Ownership Certificate">Ownership Certificate</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Upload Property Proof */}
        <div className="form-group mt-3">
          <label>Upload Property Proof (Legal Documents):</label>
          <input
            type="file"
            name="propertyProof"
            multiple
            accept=".pdf,.jpg,.png,.docx"
            required
            onChange={handlePropertyProofChange}
            className="form-control"
          />
          <small className="text-muted">
            Accepted files: PDF, JPG, PNG, DOCX
          </small>
        </div>

        {/* Amenities */}
        <label>Amenities:</label>
        <div className="mb-3">
          {amenitiesList.map((amenity, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                onChange={handleAmenitiesChange}
                className="form-check-input"
              />
              <label className="form-check-label">{amenity}</label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Submit Property
        </button>
      </form>
    </div>
  );
}

export default UploadProperty;
