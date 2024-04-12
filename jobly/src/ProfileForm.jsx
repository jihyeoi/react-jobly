import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import userContext from "./userContext";

import "./ProfileForm.css";

/**
 * Profile form
 *
 * Props:
 * - update (function)
 *
 * State:
 * - formData
 * - errors
 *
 * RouteList -> SignupForm
 */
function ProfileForm({update}) {
  const {currentUser} = useContext(userContext);
  const INITIAL_STATE = {
    username: currentUser.user.username,
    firstName: currentUser.user.firstName,
    lastName: currentUser.user.lastName,
    email: currentUser.user.email,
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  console.log("username from ProfileForm: ", currentUser);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
    //console.log("sig up form:", value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await update(formData);
      navigate("/");
    } catch (error) {
      setErrors(error);
    }
  }
  return (
    <div className="ProfileForm">
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
            value={formData.username}
            disabled
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
            value={formData.firstName}
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
            value={formData.lastName}
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
            value={formData.email}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
