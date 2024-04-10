import React, {useState, useEffect} from "react";

import {v4 as uuid} from "uuid";
import {Link} from "react-router-dom";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyApi";
import SearchForm from "./SearchForm";

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
  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(function fetchAllCompanies() {
    async function fetchCompanies() {
      const response = await JoblyApi.getCompanies();
      // console.log("response inside fetch", response);

      setCompanies({
        data: response,
        isLoading: false,
      });
    }
    fetchCompanies();
  }, []);

  function searchCompanies(searchTerm) {
    const handle = searchTerm.trim();
    console.log("handle:", handle);
    // setCompanies(companies.filter((c) => c.name.includes(name)));
  }

  if (companies.isLoading) return <i>Loading...</i>;

  return (
    <div className="CompaniesList">
      <SearchForm searchItem={searchCompanies} />
      <div className="CompaniesList-title">
        <h1>All Companies</h1>
      </div>
      <div className="CompaniesList-companies">
        {companies.data.map((c) => (
          <Link to={`${c.handle}`} key={uuid()}>
            <CompanyCard name={c.name} description={c.description} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CompaniesList;
