import React from "react";

import JobCard from "./JobCard";
import {useContext} from "react";
import userContext from "./userContext";

import "./JobCardList.css";

/**
 * Component to display list of jobs
 *
 * Props:
 * - jobs (Array)
 *
 * State:
 * - None
 *
 * JobList -> JobCardList -> JobCard
 */
function JobCardList({jobs, apply}) {
  console.debug("JobCardList", "jobs=", jobs);

  return (
    <div className="JobCardList">
      <div className="JobCardList-list">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyHandle={job.companyHandle}
          />
        ))}
      </div>
    </div>
  );
}

export default JobCardList;
