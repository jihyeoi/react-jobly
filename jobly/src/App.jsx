import { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState({
    user: {},
    isLoading: true,
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(null);

  async function register({ username, password, firstName, lastName, email }) {
    const token = await JoblyApi.register({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    setToken(token);
    localStorage.setItem("token", token);
  }

  async function login({ username, password }) {
    //console.log("username from App-login: ", username, password);
    const token = await JoblyApi.login({ username, password });
    setToken(token);
    localStorage.setItem("token", token);
  }

  function logout() {
    localStorage.removeItem("token");
    setCurrentUser({});
    setToken("");
  }

  useEffect(
    function getUserOnTokenChange() {
      console.log("token from useEffect: ", token);
      async function getUser() {
        try {
          JoblyApi.token = token;

          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;

          // use token to get username --> user data
          const user = await JoblyApi.getUser(username);
          setCurrentUser((data) => ({
            ...data,
            user: user,
            isLoading: false,
          }));
        } catch (err) {
          setError(err);
        }
      }

      if (token !== "") {
        getUser();
      } else {
        setCurrentUser((data) => ({
          ...data,
          isLoading: false,
        }));
      }
    },
    [token]
  );

  /**
   * useEffect
   *  --> when page renders, checks if there is a user in local storage
   *  --> if there is a user, then it stores it in the context
   *  --> in every page, check first if there is a user
   *  --> if there is, we return normally
   *  --> if not, we can redirect / update state
   */

  console.log("CURRENT USER IN APP", currentUser);

  // useEffect(function checkForToken() {
  //   const tokenFromStorage = localStorage.getItem("token", token);
  //   console.log("tokenFromStorage", tokenFromStorage);
  //   if (tokenFromStorage) {
  //     setToken(tokenFromStorage);
  //   }
  // }, []);

  return (
    <userContext.Provider value={{ currentUser }}>
      <div className="App">
        {currentUser.isLoading
        ? <h2>Loading...</h2>
        : <BrowserRouter>
            <NavBar logout={logout} />
            <RoutesList register={register} login={login} />
          </BrowserRouter>
        }
      </div>
    </userContext.Provider>
  );
}

export default App;
