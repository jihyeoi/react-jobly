import React, {useState} from "react";

import "./SearchForm.css";

/**
 *
 * @returns
 */
function SearchForm({searchItem}) {
  const [formData, setFormData] = useState({});

  function handleSubmit(evt) {
    evt.preventDefault();
    searchItem(formData.search);
  }

  function handleChange(evt) {
    evt.preventDefault();
    const {name, value} = evt.target;
    setFormData((fData) => ({...fData, [name]: value.trim()}));
    console.log("ev.target: ", evt.target.value.trim());
  }

  return (
    <div className="SearchForm">
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-2 SearchForm-input">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Enter search term..."
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary mb-2 SearchForm-button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
