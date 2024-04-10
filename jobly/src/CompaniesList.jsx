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

  const [searchedCompany, setSearchedCompany] = useState({
    search: null,
    companies: [],
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

  async function searchCompanies(searchTerm) {
    const handle = searchTerm.trim();

    if (!handle) return companies;

    const response = await JoblyApi.getSearchedCompany(handle);
    // console.log("RESPONSE FROM SEARCHCOMPANIES:" , response);

    setSearchedCompany({
      search: searchTerm,
      companies: response,
    });
  }

  if (companies.isLoading) return <i>Loading...</i>;

  function renderAllCompanies() {
    return (
      <div>
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

  function renderSearch() {
    return (
      <div>
        <div className="CompaniesList-title">
          <h1>Search Results For '{searchedCompany.searchTerm}'</h1>
        </div>
        <div className="CompaniesList-companies">
          {searchedCompany.companies.map((c) => (
            <Link to={`${c.handle}`} key={uuid()}>
              <CompanyCard name={c.name} description={c.description} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="CompaniesList">
      <SearchForm searchItem={searchCompanies} />
      {searchedCompany.companies.length === 0
        ? renderAllCompanies()
        : renderSearch()}
    </div>
  );
}

export default CompaniesList;
