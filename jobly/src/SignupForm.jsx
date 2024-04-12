import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import userContext from "./userContext";

import "./SignUpForm.css";

const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

/**
 * Signup form
 *
 * Props:
 * - register (function)
 *
 * State:
 * - formData
 * - errors
 *
 * RouteList -> SignupForm
 */
function SignupForm({register}) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  const {currentUser} = useContext(userContext);
  const navigate = useNavigate();

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
    // console.log("sig up form:", value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      setErrors(error);
    }
  }

  return (
    <div className="SignupForm">
      <h3>Sign Up</h3>
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
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
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

export default SignupForm;
