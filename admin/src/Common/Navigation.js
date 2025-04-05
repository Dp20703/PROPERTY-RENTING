import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navigation = () => {
  return (
    <>
      <Main />
    </>
  );
};

function Main() {
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout");
      toast.success("Logged out successfully!", {
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      toast.error("Logout failed!", { position: "top-right" });
      console.error(error);
    }
  };
  return (
    <>
      <div className="top_nav">
        <div className="nav_menu">
          <div className="nav toggle">
            <Link id="menu_toggle">
              <i className="fa fa-bars"></i>
            </Link>
          </div>
          <nav className="nav navbar-nav">
            <ul className=" navbar-right">
              <li
                className="nav-item dropdown open"
                style={{ paddingLeft: "15px" }}
              >
                <Link
                  className="user-profile dropdown-toggle"
                  aria-haspopup="true"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="images/img.jpg" alt="" />
                  Admin
                </Link>
                <div
                  className="dropdown-menu dropdown-usermenu pull-right"
                  aria-labelledby="navbarDropdown"
                >
                  {/* <Link className="dropdown-item" to={"/profile"}>
                    {" "}
                    Profile
                  </Link> */}
                  <Link className="dropdown-item" onClick={handleLogout}>
                    <i className="fa fa-sign-out pull-right"></i> Log Out
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navigation;
