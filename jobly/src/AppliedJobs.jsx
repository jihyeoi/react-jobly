
import React, {useEffect, useState, useContext} from "react";
import userContext from "./userContext";
import JoblyApi from "./JoblyApi";

function AppliedJobs() {

    const {currentUser} = useContext(userContext);
    const [applications, setApplications] = useState({
        isLoading: true,
        applications: [],
    })
    const [error, setError] = useState(null)

    const jobIds = currentUser.user.applications


    useEffect(function getApplications() {
        async function fetchApplications(jobIds) {
            try {
                const response = await JoblyApi.getAppliedJobs(jobIds);
                console.log("response", response)
                setApplications({
                    isLoading: false,
                    applications: response
                });
            } catch (err) {
                setError(err);
            }

        }
        fetchApplications(jobIds)
      }, []);

    // get all applications
    console.log("appications", currentUser.user.applications)

    return(
        <div>
            <h1>ALL MY APPLIED JOBS</h1>
        </div>
    )
}

export default AppliedJobs