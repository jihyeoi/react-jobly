import React, {useState, useEffect} from "react";
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import {useContext} from "react";
import userContext from "./userContext";
import {Navigate} from "react-router-dom";

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
  const [jobs, setJobs] = useState({
    isLoading: true,
    jobs: [],
  });
  const [searchedJob, setSearchJob] = useState("");
  const {currentUser} = useContext(userContext);

  useEffect(function fetchAllJobs() {
    async function fetchJobs() {
      const response = await JoblyApi.getJobs();

      setJobs({
        isLoading: false,
        jobs: response,
      });
    }
    fetchJobs();
  }, []);

  /** search through all jobs by partial or full job name */
  async function searchJobs(jobName) {
    const name = jobName.trim();

    const response = await JoblyApi.getJobs(name);

    setSearchJob(name);

    setJobs({
      jobs: response,
      isLoading: false,
    });
  }

  if (jobs.isLoading)
    return (
      <div className="JobsList-message">
        <i>Loading...</i>
      </div>
    );

  /** function to render all Jobs to display on page */
  function renderAllJobs() {
    return (
      <div className="JobsList-jobs">
        <div className="JobsList-title">
          {!searchedJob ? (
            <h2>All Jobs</h2>
          ) : (
            <h2>Search Results for '{searchedJob}'</h2>
          )}
        </div>
        {jobs.jobs.length > 0 ? (
          <div className="JobsList-jobs">
            <JobCardList jobs={jobs.jobs} />
          </div>
        ) : (
          <div className="JobsList-message">
            "Sorry, no results were found!"
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="JobsList">
      <SearchForm searchItem={searchJobs} />
      {renderAllJobs()}
    </div>
  );
}
export default JobsList;
