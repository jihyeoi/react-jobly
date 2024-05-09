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
  return (
    <div className="HomePage">
      <h1 class="HomePage-title">Jobly</h1>
      {!currentUser.user
      ? "All the jobs in one, convenient place."
      : <div class="HomePage-welcome">
          <p>______________</p>
          Welcome, {" "}
          <i>
            {currentUser.user.firstName} {currentUser.user.lastName}!
          </i>
          <div>
            <img class="HomePage-img" src="https://i.gifer.com/49A6.gif"/>
          </div>
          <p>______________</p>
        </div>
      }
    </div>
  );
}

export default HomePage;
