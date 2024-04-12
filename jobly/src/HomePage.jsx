import React, {useState} from "react";
import {useContext} from "react";
import userContext from "./userContext";

import "./HomePage.css";

/**
 * Homepage
 *
 * state: none
 * useEffect: none
 * props: none
 *
 * RoutesList --> HomePage
 */

function HomePage() {
  const {currentUser} = useContext(userContext);
  //console.log("First Name from Homepage: ", firstName);
  console.log("useContext: ", useContext(userContext));
  return (
    <div className="HomePage">
      <h1>Jobly</h1>
      {!currentUser.user ? (
        "All the jobs in one, convenient place."
      ) : (
        <h2>
          Welcome{" "}
          <i>
            {currentUser.user.firstName} {currentUser.user.lastName}!
          </i>
        </h2>
      )}
    </div>
  );
}

export default HomePage;
