import React, {useState, useEffect} from "react";
// import CompanyCard from "./CompanyCard"
import JoblyApi from "./JoblyApi";

/**
 * renders list of all companies
 *
 * state: companies
 * useEffect: makes AJAX call
 * props: none
 *
 * App --> RoutesList --> CompaniesList --> CompanyCard
 */

function CompaniesList() {

    const [companies, setCompanies] = useState([])

    useEffect(function fetchAllCompanies() {
        async function fetchCompanies() {
            const response = await JoblyApi.getCompanies()
            console.log("response inside fetch", response)

            setCompanies(response)
        }
        fetchCompanies();
    }, [])

    function searchCompanies(name) {
        setCompanies(companies.filter(c => c.name.includes(name)))
    }

    return(
        <div>
            {/* <SearchForm search={searchCompanies} /> */}
            {/* {companies.map((c, i) => (
                <CompanyCard key={i} name={c}/>
            ))} */}
            COMPANIES
        </div>
    )
}

export default CompaniesList;