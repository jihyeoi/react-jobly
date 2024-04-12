import {useState, useEffect} from "react";
import RoutesList from "./RouteList";
import NavBar from "./NavBar";
import {BrowserRouter} from "react-router-dom";
import userContext from "./userContext";
import JoblyApi from "./JoblyApi";
import {jwtDecode} from "jwt-decode";

import "./App.css";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 * App -> RouteList, NavBar
 */
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  console.log("currentUser 1", currentUser);

  //TODO: Change res name for token
  async function register({username, password, firstName, lastName, email}) {
    const res = await JoblyApi.register({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    setToken(res);
  }

  async function login({username, password}) {
    //console.log("username from App-login: ", username, password);
    const res = await JoblyApi.login({username, password});
    setToken(res);
  }

  function logout() {
    setCurrentUser({});
    setToken("");
  }

  //TODO: FROM 52-> 59 put in try catch. If error, logout user
  useEffect(
    function getUserOnTokenChange() {
      console.log("token from useEffect: ", token);
      async function getUser() {
        JoblyApi.token = token;

        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        // use token to get username --> user data
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
        console.log(user, "USER FROM USE EFFECT");
      }
      //TODO: Use if condition here instead
      {
        token !== "" ? getUser() : "";
      }
    },
    [token]
  );

  return (
    <userContext.Provider value={{currentUser}}>
      <div className="App">
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList register={register} login={login} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
