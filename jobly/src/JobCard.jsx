import React, {useCallback} from "react";
import {useContext} from "react";
import userContext from "./userContext";

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
function JobCard({id, title, salary, equity, companyHandle, applyToJob, isApplied}) {
  console.log("applyToJob from JobCard", typeof applyToJob)

  const {currentUser} = useContext(userContext);

  console.log("id", id, "isApplied", isApplied)

  return (
    <div className="JobCard">
        {!isApplied
        ? <button className="JobCard-button" onClick={() => applyToJob(id)}>Apply</button>
        : <button className="JobCard-button-disabled" disabled>Applied</button>}
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
