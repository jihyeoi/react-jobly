import React, {useState, useEffect} from "react";

import {v4 as uuid} from "uuid";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyApi";

import "./CompaniesList.css";

/**
 * renders list of all companies
 *
 * state: companies
 * useEffect: makes AJAX call
 * props: none
 *
 * RoutesList --> CompaniesList --> CompanyCard, SearchForm
 */

function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function fetchAllCompanies() {
    async function fetchCompanies() {
      const response = await JoblyApi.getCompanies();
      console.log("response inside fetch", response);

      setCompanies(response);
    }
    fetchCompanies();
  }, []);

  function searchCompanies(name) {
    setCompanies(companies.filter((c) => c.name.includes(name)));
  }

  return (
    <div className="CompaniesList">
      <div className="CompaniesList-title">
        <h1>All Companies</h1>
      </div>
      <div className="CompaniesList-companies">
        {companies.map((c) => (
          <CompanyCard key={uuid()} name={c.name} description={c.description} />
        ))}
      </div>
      {/* <SearchForm search={searchCompanies} /> */}
    </div>
  );
}

export default CompaniesList;
