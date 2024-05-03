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

  const [currentUser, setCurrentUser] = useState({
    user: null,
    isLoading: true,
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(null);

  useEffect(
    function getUserOnTokenChange() {
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
        localStorage.setItem("token", token)
      } else {
        setCurrentUser({
          user: null,
          isLoading: false,
        });
        localStorage.removeItem("token")
      }
    },
    [token]
  );

  async function register({username, password, firstName, lastName, email}) {
    const token = await JoblyApi.register({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    setToken(token);
  }

  async function login({username, password}) {
    const token = await JoblyApi.login({username, password});
    setToken(token);
  }

  async function update({username, firstName, lastName, email}) {
    const user = await JoblyApi.updateUser({
      username,
      firstName,
      lastName,
      email
    })
    setCurrentUser(data => ({
      ...data,
      user: user,
    }));
  }

  function logout() {
    setCurrentUser({user: null, isLoading: true});
    setToken("");
  }

  return (
    <userContext.Provider value={{currentUser}}>
      <div className="App">
        {currentUser.isLoading
        ? (<h2>Loading...</h2>)
        : (<BrowserRouter>
            <NavBar logout={logout} />
            <RoutesList register={register} login={login} update={update} />
          </BrowserRouter>
        )}
      </div>
    </userContext.Provider>
  );
}

export default App;
