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
    return (
      <div className="NavBar-routes">
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={logoutUser} to="/">
          Log out - {currentUser.user.username}
        </NavLink>
      </div>
    );
  }
  //TODO: Chnage username conditional
  return (
    <div className="NavBar">
      <div className="NavBar-homepage">
        <NavLink to="/">HomePage</NavLink>
      </div>
      <div className="NavBar-routes">
        {!currentUser.user ? (
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
