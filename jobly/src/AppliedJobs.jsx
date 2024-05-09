
import React, {useEffect, useState, useContext} from "react";
import userContext from "./userContext";
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";

import "./AppliedJobs.css";

/**
 * renders list of applied jobs
 *
 * state: applications
 * useEffect: makes AJAX call
 * props: none
 *
 * AppliedJobs --> JobCardList
 */

function AppliedJobs() {

    const {currentUser} = useContext(userContext);
    const [applications, setApplications] = useState({
        isLoading: true,
        applications: [],
    })
    const [error, setError] = useState(null)

    const jobIds = currentUser.user.applications
    console.log("applications1", applications)
    console.log("jobIds", jobIds)

    useEffect(function getApplications() {
        async function fetchApplications(jobIds) {
            let response;
            try {
                response = await JoblyApi.getAppliedJobs(jobIds);
            } catch (err) {
                setError(err);
                setApplications({ isLoading: false, applications: [] });
            }
            setApplications({
                isLoading: false,
                applications: response.jobs
            });
        }

        fetchApplications(jobIds)
    }, [applications.applications.length]);

    // get all applications
    console.log("appications", applications.applications)

    return(
        <div key={jobIds.length}>
            <h1 className="AppliedJobs-header">My Job Applications</h1>
            {applications.applications.length > 0
            ? <JobCardList jobs={applications.applications} />
            : <div className="AppliedJobs-message">
                "You have not applied to any jobs yet!"
                </div>}
        </div>
    )
}

export default AppliedJobs