import React, {useState} from "react";
import {useContext} from "react";
import userContext from "./userContext";
import {Navigate} from "react-router-dom";

import "./LoginForm.css";

const INITIAL_STATE = {
  username: "",
  password: "",
};

/**
 * Login form
 *
 * Props:
 * - login (function)
 *
 * State:
 * - formData
 * - errors
 *
 * RouteList -> LoginForm
 */
function LoginForm({login}) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const [errors, setErrors] = useState([]);

  // console.log("errors: ", errors);

  //TODO: Take error out of []
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      setFormData(INITIAL_STATE);
    } catch (error) {
      setErrors([error]);
    }
  }

  console.log("errors: ", errors);

  const {currentUser} = useContext(userContext);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((fData) => ({...fData, [name]: value}));
  }

  if (Object.keys(currentUser).length !== 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="LoginForm">
      <h3>Log In</h3>
      {errors.length > 0
        ? errors.map((err) => (
            <div className="alert alert-danger" role="alert" key={err}>
              {err}
            </div>
          ))
        : ""}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
