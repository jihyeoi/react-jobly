import React, {useState, useEffect} from "react";
// import CompanyCard from "./CompanyCard"
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";

import "./JobsList.css";

/**
 * renders list of all jobs
 *
 * state: jobs
 * useEffect: makes AJAX call
 * props: none
 *
 * JobsList --> JobCardList
 */
function JobsList() {
  console.log("This is JobsList!");
  const [jobs, setJobs] = useState([]);

  useEffect(function fetchAllJobs() {
    async function fetchJobs() {
      console.log("This is the async function for fetching jobs!");
      const response = await JoblyApi.getJobs();
      console.log("jobs inside fetch", response);

      setJobs(response);
    }
    fetchJobs();
  }, []);

  return (
    <div className="JobsList">
      <div className="JobsList-title">
        <h2>All Jobs</h2>
      </div>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobsList;
