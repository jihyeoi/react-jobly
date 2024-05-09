import React, {useContext, useState} from "react";
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
function JobCard({id, title, salary, equity, companyHandle}) {
  const { hasAppliedToJob, applyToJob } = useContext(userContext);
  const [applied, setApplied] = useState();

  React.useEffect(
    function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard">
        <button
          className="JobCard-button"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
        <div className="JobCard-title">
        <h6>{title}</h6>
        <p>{companyHandle}</p>
      </div>

      <div className="JobCard-description">
        <p>Salary: {"$" + Intl.NumberFormat("en-US").format(salary)}</p>
        <p>Equity: {equity}</p>
      </div>
    </div>
  );
}

export default JobCard;
