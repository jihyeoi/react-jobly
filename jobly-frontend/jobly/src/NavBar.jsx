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
        <NavLink to="/companies" className={({ isActive }) => isActive ? 'active-link' : undefined}>Companies</NavLink>
        <NavLink to="/jobs" className={({ isActive }) => isActive ? 'active-link' : undefined}>Jobs</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : undefined}>Profile</NavLink>
        <NavLink onClick={logoutUser} to="/">
          Log out - {currentUser.user.username}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="NavBar">
      <div className="NavBar-homepage">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>HomePage</NavLink>
      </div>
      <div className="NavBar-routes">
        {!currentUser.user ? (
          <div className="NavBar-routes">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : undefined}>Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active-link' : undefined}>Sign Up</NavLink>
          </div>
        ) : (
          renderLinks()
        )}
      </div>
    </div>
  );
}

export default NavBar;
