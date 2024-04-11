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
  const [searchedJob, setSearchJob] = useState("");

  useEffect(function fetchAllJobs() {
    async function fetchJobs() {
      const response = await JoblyApi.getJobs();
      // console.log("jobs inside fetch", response);

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

    // if (name === "") {
    //   setSearchJobs({
    //     searchTerm: null,
    //     jobs: [],
    //   });
    //   return jobs;
    // }

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

  /** function to render searched Jobs to display on page */
  // function renderSearchedJobs() {
  //   return (
  //     <div className="JobsList-jobs">
  //       <div className="JobsList-title">
  //         <h2>Search Results for '{searchedJobs.searchTerm}'</h2>
  //       </div>
  //       <div className="JobsList-jobs">
  //         <JobCardList jobs={searchedJobs.jobs} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="JobsList">
      <SearchForm searchItem={searchJobs} />
      {renderAllJobs()}
      {/* {!searchedJobs.searchTerm ? renderAllJobs() : renderSearchedJobs()} */}
    </div>
  );
}
export default JobsList;
