import React from "react";
import {Link} from "react-router-dom";
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

  function logout() {
    logout();
  }

  //TODO: Use NavLinks rather than Links
  function renderLinks() {
    console.log("currentUser from renderLinks: ", currentUser);
    return (
      <div className="NavBar-routes">
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={logout} to="/">
          Log out - {currentUser.username}
        </Link>
      </div>
    );
  }

  return (
    <div className="NavBar">
      <div className="NavBar-homepage">
        <Link to="/">HomePage</Link>
      </div>
      <div className="NavBar-routes">
        {Object.keys(currentUser).length === 0 ? (
          <div className="NavBar-routes">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        ) : (
          renderLinks()
        )}
      </div>
    </div>
  );
}

export default NavBar;
