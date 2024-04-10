import HomePage from "./HomePage";
import CompaniesList from "./CompaniesList"
import { Route, Routes, Navigate } from "react-router-dom";
import JobsList from "./JobsList"
// import CompanyDetails from "./CompanyDetails"

//TODO: route to *
function RoutesList() {
    return (
        <div>
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<CompaniesList />} path="/companies" />
                <Route element={<JobsList />} path="/jobs" />
                {/* <Route element={<CompanyDetails />} path="/companies/:name" /> */}
            </Routes>
        </div>
    );
}

export default RoutesList;