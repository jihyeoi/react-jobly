import React, {useState} from "react";
import {useContext} from "react";
import userContext from "./userContext";
import {useNavigate} from "react-router-dom";

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

  const {currentUser} = useContext(userContext);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      setErrors(error);
    }
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((fData) => ({...fData, [name]: value}));
  }
  // TODO: Use alert component
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
