import React from "react";

import {v4 as uuid} from "uuid";

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
function JobCardList({jobs, applyToJob}) {

  const {currentUser} = useContext(userContext);


  return (
    <div className="JobCardList">
      <div className="JobCardList-list">
        {jobs.map((job) => (
          <JobCard
            key={uuid()}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyHandle={job.companyHandle}
            applyToJob={() => applyToJob(currentUser.user.username, job.id)}
            showApplyButton={!job.applied}
          />
        ))}
      </div>
    </div>
  );
}

export default JobCardList;
