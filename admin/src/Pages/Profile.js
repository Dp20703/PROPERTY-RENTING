import React, { useState } from "react";
import Navigation from "../Common/Navigation";
import Slider from "../Common/Slider";
import Footer from "../Common/Footer";

const Profile = () => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Samuel Doe",
    email: "admin@example.com",
    location: "San Francisco, California, USA",
    role: "Software Engineer",
    website: "www.kimlabs.com",
    avatar: "images/picture.jpg",
  });

  const [newProfile, setNewProfile] = useState({ ...profile });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewProfile({ ...profile });
  };

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(newProfile);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile({ ...newProfile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
      <div className="mb-5">
        <div className="page-title">
          <div className="title_left">
            <h3>Admin Profile</h3>
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div className="row">
        <div className="col-md-12 col-sm-12 ">
          <div className="x_panel">
            <div className="x_content">
              <div className="col-md-3 col-sm-3 profile_left text-center">
                <div className="profile_img">
                  <img
                    className="img-responsive avatar-view rounded-circle"
                    src={isEditing ? newProfile.avatar : profile.avatar}
                    alt="Avatar"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control mt-2"
                    />
                  )}
                </div>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={newProfile.name}
                      onChange={handleChange}
                      className="form-control mt-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={newProfile.email}
                      onChange={handleChange}
                      className="form-control mt-2"
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{profile.name}</h3>
                    <p>{profile.email}</p>
                    <ul className="list-unstyled user_data">
                      <li>
                        <i className="fa fa-map-marker user-profile-icon" />{" "}
                        {profile.location}
                      </li>
                      <li>
                        <i className="fa fa-briefcase user-profile-icon" />{" "}
                        {profile.role}
                      </li>
                      <li className="m-top-xs">
                        <i className="fa fa-external-link user-profile-icon" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {profile.website}
                        </a>
                      </li>
                    </ul>
                    <button
                      className="btn btn-success"
                      onClick={handleEditToggle}
                    >
                      <i className="fa fa-edit m-right-xs" /> Edit Profile
                    </button>
                  </>
                )}
              </div>
              <div className="col-md-9 col-sm-9">
                <div className="profile_title">
                  <h2>Admin Activity Report</h2>
                </div>
                <div role="tabpanel">
                  <ul className="messages">
                    {[
                      {
                        name: "Desmond Davison",
                        date: "24",
                        month: "May",
                        message:
                          "Raw denim you probably haven't heard of them jean shorts Austin.",
                      },
                      {
                        name: "Brian Michaels",
                        date: "21",
                        month: "May",
                        message:
                          "Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher.",
                      },
                      {
                        name: "Desmond Davison",
                        date: "24",
                        month: "May",
                        message:
                          "Raw denim you probably haven't heard of them jean shorts Austin.",
                      },
                      {
                        name: "Brian Michaels",
                        date: "21",
                        month: "May",
                        message:
                          "Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher.",
                      },
                    ].map((activity, index) => (
                      <li key={index} className="d-flex align-items-center">
                        <div className="message_date text-center">
                          <h3 className="date text-info mb-0">
                            {activity.date}
                          </h3>
                          <p className="month">{activity.month}</p>
                        </div>
                        <div className="message_wrapper ms-3">
                          <h4 className="heading">{activity.name}</h4>
                          <blockquote className="message">
                            {activity.message}
                          </blockquote>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
