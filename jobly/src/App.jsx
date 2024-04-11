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
  const [token, setToken] = useState("")

  console.log("currentUser 1", currentUser);

  async function register({username, password, firstName, lastName, email}) {
    let res;
    try {
      res = await JoblyApi.register({username, password, firstName, lastName, email})
      setToken(res.token);
    } catch(err) {
      console.log(err);
    }
  }

  async function login({username, password}) {
    const res = await JoblyApi.login(currentUser)
    setToken(res);
  }

  useEffect(function getUserOnTokenChange() {
    async function getUser() {
      JoblyApi.token = token

      const decodedToken = jwtDecode(token)
      const username = decodedToken.username

      // use token to get username --> user data
      const user = await JoblyApi.getUser(username);
      console.log(user, "USER FROM USE EFFECT")
    }
    getUser();
  }, [token])



  return (
    <userContext.Provider value={{currentUser}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RoutesList register={register} login={login}/>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
