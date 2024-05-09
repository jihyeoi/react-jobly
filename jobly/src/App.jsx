import React, { useState, useEffect } from "react";
import RoutesList from "./RouteList";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import userContext from "./userContext";
import JoblyApi from "./JoblyApi";
import { jwtDecode } from "jwt-decode";

import "./App.css";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 * App -> RouteList, NavBar
 */
function App() {
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState({
    user: null,
    isLoading: true,
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(null);

  useEffect(
    function getUserOnTokenChange() {
      async function getCurrentUser() {
        if (token) {
          try {
            // use token to get username --> user data
            JoblyApi.token = token;
            let { username } = jwtDecode(token);
            const currentUser = await JoblyApi.getUser(username);

            setCurrentUser((data) => ({
              ...data,
              user: currentUser,
              isLoading: false,
            }));
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            setError(err);
            setCurrentUser({
              user: null,
              isLoading: true
            })
          }
        }
        else {
          setCurrentUser({
            user: null,
            isLoading: false,
          });
          localStorage.removeItem("token");
        }
      }
      getCurrentUser();
    },
    [token]
  );

  async function register({ username, password, firstName, lastName, email }) {
    const token = await JoblyApi.register({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    localStorage.setItem("token", token)
    setToken(token);
  }

  async function login({ username, password }) {
    const token = await JoblyApi.login({ username, password });
    localStorage.setItem("token", token)
    setToken(token);
  }

  async function update({ username, firstName, lastName, email }) {
    const user = await JoblyApi.updateUser({
      username,
      firstName,
      lastName,
      email,
    });
    setCurrentUser((data) => ({
      ...data,
      user: user,
    }));
  }

  function logout() {
    setCurrentUser({ user: null, isLoading: true });
    setToken("");
    localStorage.removeItem("token")
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id)
  }

  /** Apply to a job: make API call and update set of application IDs. */
  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    console.log("currentUser applyToJob", currentUser, "id: ", id);
    await JoblyApi.apply(currentUser.user.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <userContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hasAppliedToJob,
        applyToJob
        }}
      >
      <div className="App">
        {currentUser.isLoading
        ? <h2 className="App-LoadingSpinner">Loading...</h2>
        : <BrowserRouter>
            <NavBar logout={logout} />
            <RoutesList currentUser={currentUser.user} register={register} login={login} update={update} />
          </BrowserRouter>
        }
      </div>
    </userContext.Provider>
  );
}

export default App;
