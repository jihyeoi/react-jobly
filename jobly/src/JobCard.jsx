import React from "react";

import "./JobCard.css";

/**
 * Presentational component to display a Jobs's details
 *
 * Props:
 * - title
 * - salary
 * - equity
 * - companyHandle
 *
 * State:
 * - None
 *
 * JobCardList -> JobCard
 */
function JobCard({title, salary, equity, companyHandle}) {
  console.log("This is JobCard!");

  return (
    <div className="JobCard">
      <div className="JobCard-title">
        <h6>{title}</h6>
        <p>{companyHandle}</p>
      </div>

      <div className="JobCard-description">
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
      </div>
    </div>
  );
}

export default JobCard;
