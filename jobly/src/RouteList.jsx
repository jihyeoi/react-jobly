import HomePage from "./HomePage";
import CompaniesList from "./CompaniesList";
import {Route, Routes, Navigate} from "react-router-dom";
import JobsList from "./JobsList";
// import CompanyDetails from "./CompanyDetails"

/**
 * Routes list
 *
 * Props: None
 *
 * State: None
 *
 * App -> RoutesList -> CompanyDeatail, JobList, CompanyList, Homepage
 */
function RoutesList() {
  return (
    <div>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<CompaniesList />} path="/companies" />
        <Route element={<JobsList />} path="/jobs" />
        {/* <Route element={<CompanyDetails />} path="/companies/:name" /> */}
        <Route element={<HomePage />} path="*" />
      </Routes>
    </div>
  );
}

export default RoutesList;
