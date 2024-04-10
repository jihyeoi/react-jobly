import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";

/**
 * Navigation Bar with links to Companies, Jobs and Homepage
 *
 * Props:
 *  -None
 *
 * State: None
 *
 * App -> Navbar
 */
function NavBar() {
  return (
    <div className="NavBar">
      <div className="NavBar-homepage">
        <Link to="/">HomePage</Link>
      </div>
      <div className="NavBar-routes">
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
    </div>
  );
}

export default NavBar;
