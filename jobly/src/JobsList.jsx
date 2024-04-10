import React, {useState, useEffect} from "react";
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

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
  const [searchedJobs, setSearchJobs] = useState({
    searchTerm: null,
    jobs: [],
  });

  console.log("searchedJobs: ", searchedJobs);

  useEffect(function fetchAllJobs() {
    async function fetchJobs() {
      // console.log("This is the async function for fetching jobs!");
      const response = await JoblyApi.getJobs();
      console.log("jobs inside fetch", response);

      setJobs({isLoading: false, jobs: response});
    }
    fetchJobs();
  }, []);

  async function searchJobs(jobName) {
    const name = jobName.trim();

    if (name === "") return jobs;

    const response = await JoblyApi.getSearchedJob(name);

    setSearchJobs({
      searchTerm: name,
      jobs: response,
    });
  }

  if (jobs.isLoading) return <i>Loading...</i>;

  function renderSearchedJobs() {
    return (
      <div className="JobsList-jobs">
        <div className="JobsList-title">
          <h2>Search Results for '{searchedJobs.searchTerm}'</h2>
        </div>
        <div className="JobsList-jobs">
          <JobCardList jobs={searchedJobs.jobs} />
        </div>
      </div>
    );
  }

  function renderAllJobs() {
    return (
      <div className="JobsList-jobs">
        <div className="JobsList-title">
          <h2>All Jobs</h2>
        </div>
        <div className="JobsList-jobs">
          <JobCardList jobs={jobs.jobs} />
        </div>
      </div>
    );
  }

  return (
    <div className="JobsList">
      <SearchForm searchItem={searchJobs} />
      {searchedJobs.searchTerm ? renderSearchedJobs() : renderAllJobs()}
    </div>
  );
}
export default JobsList;
