import "./App.css";
import RoutesList from "./RouteList";
import NavBar from "./NavBar";
import {BrowserRouter} from "react-router-dom";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 * App -> RouteList, NavBar
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
