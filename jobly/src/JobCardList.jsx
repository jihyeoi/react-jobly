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
function JobCardList({jobs, applyToJob, appliedJobs}) {
  const {currentUser} = useContext(userContext);

    console.log("applyToJob from JobCard", typeof applyToJob)


  console.log("appliedJobs in JobCardList", appliedJobs)

  function handleApply(jobId) {
    if (currentUser && currentUser.user) {
      applyToJob(currentUser.user.username, jobId)
    } else {
      console.error("No current user available");
    }
  }

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
            applyToJob={handleApply}
            isApplied={appliedJobs ? appliedJobs.has(job.id) : false}
          />
        ))}
      </div>
    </div>
  );
}

export default JobCardList;
