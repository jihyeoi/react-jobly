import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import usePagination from "./usePagination";
import PaginationControls from "./PaginationControl";
import {useContext} from "react";
import userContext from "./userContext";

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
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const storedJobs = localStorage.getItem("appliedJobs");
    return new Set(storedJobs ? JSON.parse(storedJobs) : []);
  });
  const [error, setError] = useState(null);
  const { currentData, next, prev, reset, currentPage, maxPage } =
    usePagination(jobs.jobs, 20);
  const {currentUser} = useContext(userContext);

  const appliedJobsKey = currentUser ? `appliedJobs_${currentUser.user.username}` : "appliedJobs"; // Fallback key if no user is found

  console.log("appliedJobs from JobList", appliedJobs);

  useEffect(function fetchAllJobs() {
    async function fetchJobs() {
      try {
        const response = await JoblyApi.getJobs();

        const storedJobs = JSON.parse(localStorage.getItem(appliedJobsKey));
        const appliedJobsSet = new Set(storedJobs || []);

        const jobsWithAppliedStatus = response.map(job => ({
          ...job,
          isApplied: appliedJobsSet.has(job.id)
        }));

        setJobs({
          isLoading: false,
          jobs: jobsWithAppliedStatus
        });
      } catch (err) {
        setError(err);
      }

    }
    // const storedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
    // if (storedJobs) {
    //   setAppliedJobs(new Set(storedJobs));
    // }
    fetchJobs();
  }, [appliedJobsKey]);

  // useEffect(() => {
  //   reset();
  // }, [jobs]);

  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify([...appliedJobs]));
  }, [appliedJobs]);

  /** search through all jobs by partial or full job name */
  async function searchJobs(jobName) {
    const name = jobName.trim();
    try {
      const response = await JoblyApi.getJobs(name);
      setSearchJob(name);

      setJobs({
        jobs: response,
        isLoading: false,
      });
    } catch (err) {
      setError(err);
    }
  }

  /** apply to job */
  async function applyToJob(username, jobId) {
    console.log(
      "username from applyToJob in JobsList",
      username,
      "jobId",
      jobId
    );
    try {
      await JoblyApi.apply({ username, jobId });
      const existingJobs = JSON.parse(localStorage.getItem(appliedJobsKey)) || [];
      if (!existingJobs.includes(jobId)) {
        existingJobs.push(jobId);
        localStorage.setItem(appliedJobsKey, JSON.stringify(existingJobs));
      }
      setJobs(current => ({
        ...current,
        jobs: current.jobs.map(job => job.id === jobId ? {...job, isApplied: true} : job)
      }));
      setAppliedJobs(current => new Set(current.add(jobId)));
    } catch (err) {
      setError(err);
    }
  }

  if (jobs.isLoading)
    return (
      <div className="JobsList-message">
        <i>Loading...</i>
      </div>
    );

  console.log("applyToJob from JobsList", typeof applyToJob)
  // /** function to filter for applied jobs */
  // function getAppliedJobs() {
  //   return jobs.jobs.filter((job) => job.isApplied);
  // }

  /** function to render all Jobs to display on page */
  function renderAllJobs() {
    return (
      <div className="JobsList-jobs">
        <div className="JobsList-title">
          {!searchedJob
          ? <h1>All Jobs</h1>
          : <h1>Search Results for '{searchedJob}'</h1>}
        </div>
        {jobs.jobs.length > 0
        ? <div className="JobsList-jobs">
            <JobCardList
              jobs={currentData}
              applyToJob={applyToJob}
              appliedJobs={new Set(JSON.parse(localStorage.getItem(appliedJobsKey)))}
            />
            <PaginationControls
              next={next}
              prev={prev}
              currentPage={currentPage}
              maxPage={maxPage}
            />
          </div>
        : <div className="JobsList-message">
            "Sorry, no results were found!"
          </div>}
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
