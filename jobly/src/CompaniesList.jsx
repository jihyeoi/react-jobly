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
    data: [],
    isLoading: true,
  });

  // TODO: just have (empty string) and update state for companies when we use this
  const [searchedCompany, setSearchedCompany] = useState("");

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

  /** search through all companies by partial or full company name */
  async function searchCompanies(searchTerm) {
    const handle = searchTerm.trim();

    // if (handle === "") {
    //   setSearchedCompany("");
    //   setCompanies({
    //     data: [],
    //     isLoading: true,
    //   })
    //   return companies;
    // }

    const response = await JoblyApi.getCompanies(handle);

    setSearchedCompany(handle);
    setCompanies({
      data: response,
      isLoading: false,
    });
  }

  if (companies.isLoading)
    return (
      <div className="CompaniesList-message">
        <i>Loading...</i>
      </div>
    );

  /** function to render all Companies to display on page */
  function renderAllCompanies() {
    return (
      <div>
        <div className="CompaniesList-title">
          {!searchedCompany ? (
            <h1>All Companies</h1>
          ) : (
            <h1>Search Results For '{searchedCompany}'</h1>
          )}
        </div>
        {companies.data.length > 0 ? (
          <div className="CompaniesList-companies">
            {/* TODO: add logic to put "sorry no results found!" */}
            {companies.data.map((c) => (
              <Link to={`${c.handle}`} key={uuid()}>
                <CompanyCard name={c.name} description={c.description} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="CompaniesList-message">
            "Sorry, no results were found!"
          </div>
        )}
      </div>
    );
  }

  // /** function to render searched Companies to display on page */
  // function renderSearch() {
  //   return (
  //     <div>
  //       <div className="CompaniesList-title">
  //         <h1>Search Results For '{searchedCompany}'</h1>
  //       </div>
  //       <div className="CompaniesList-companies">
  //         {companies.data.map((c) => (
  //           <Link to={`${c.handle}`} key={uuid()}>
  //             <CompanyCard name={c.name} description={c.description} />
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="CompaniesList">
      <SearchForm searchItem={searchCompanies} />
      {renderAllCompanies()}
    </div>
  );
}

export default CompaniesList;
