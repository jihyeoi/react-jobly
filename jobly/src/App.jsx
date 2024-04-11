import {useState} from "react";
import RoutesList from "./RouteList";
import NavBar from "./NavBar";
import {BrowserRouter} from "react-router-dom";
import userContext from "./userContext";

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

  console.log("currentUser 1", currentUser);

  function register({username, password, firstName, lastName, email}) {
    setCurrentUser({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    console.log("currentUser 2", currentUser);
  }

  return (
    <userContext.Provider value={{currentUser}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <RoutesList register={register} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
