import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "./JoblyApi";
import JobCardList from "./JobCardList";

import "./CompanyDetails.css";

/**
 * renders detail page for company
 *
 * state: company
 * useEffect: makes AJAX call
 * props: none
 *
 * RoutesList --> CompanyDetails --> JobCardList
 */

function CompanyDetails() {
  const [company, setCompany] = useState({
    data: null,
    isLoading: true,
  });

  const {name} = useParams();

  useEffect(function fetchCompanyByName() {
    async function fetchCompany() {
      const response = await JoblyApi.getCompany(name);
      // console.log("COMPANY DETAILS inside fetch", response);

      setCompany({
        data: response,
        isLoading: false,
      });
    }
    fetchCompany();
  }, []);

  if (company.isLoading) return <i>Loading...</i>;

  return (
    <div className="CompanyDetails">
      <div className="CompanyDetails-title">
        <h1>{company.data.name}</h1>
        <p>{company.data.description}</p>
      </div>

      <JobCardList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetails;
