import React, {useState} from "react";

import "./LoginForm.css";

const INITIAL_STATE = {
  username: "",
  password: ""
};

function LoginForm({}) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleSubmit(evt) {
    evt.preventDefault();
    searchItem(formData.search);
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((fData) => ({...fData, [name]: value}));
  }

  return (
    <div className="LoginForm">
      <h3>Log In</h3>
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
