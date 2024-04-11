import React, {useState} from "react";
import {useContext} from "react";
import userContext from "./userContext";

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
    <div>
      <h1>Jobly</h1>
      {Object.keys(currentUser).length === 0 ? (
        ""
      ) : (
        <h2>
          Welcome {currentUser.firstName} {currentUser.lastName}!
        </h2>
      )}
    </div>
  );
}

export default HomePage;
