import React from "react";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import userContext from "./userContext";
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
function NavBar({logout}) {
  const {currentUser} = useContext(userContext);

  function logoutUser() {
    logout();
  }

  function renderLinks() {
    console.log("currentUser from renderLinks: ", currentUser);
    return (
      <div className="NavBar-routes">
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={logoutUser} to="/">
          Log out - {currentUser.username}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="NavBar">
      <div className="NavBar-homepage">
        <NavLink to="/">HomePage</NavLink>
      </div>
      <div className="NavBar-routes">
        {Object.keys(currentUser).length === 0 ? (
          <div className="NavBar-routes">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        ) : (
          renderLinks()
        )}
      </div>
    </div>
  );
}

export default NavBar;
