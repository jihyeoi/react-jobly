import HomePage from "./HomePage";
import CompaniesList from "./CompaniesList";
import {Route, Routes, Navigate} from "react-router-dom";
import JobsList from "./JobsList";
import CompanyDetails from "./CompanyDetails";
import SingupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import AppliedJobs from "./AppliedJobs";

/**
 * Routes list
 *
 * Props: None
 *
 * State: None
 *
 * App -> RoutesList -> CompanyDeatail, JobList, CompanyList, Homepage
 */
function RoutesList({register, login, update, currentUser}) {

  function renderForLoggedUsers() {
    return (
      <>
        <Route element={<CompaniesList />} path="/companies" />
        <Route element={<JobsList />} path="/jobs" />
        <Route element={<CompanyDetails />} path="/companies/:name" />
        <Route element={<ProfileForm update={update}/>} path="/profile" />
        <Route element={<AppliedJobs />} path="/myjobs" />
      </>
    );
  }

  function renderForNonLoggedUsers() {
    return (
      <>
        <Route element={<SingupForm register={register} />} path="/signup" />
        <Route element={<LoginForm login={login} />} path="/login" />
      </>
    );
  }

  return (
    <div>
      <Routes>
        <Route element={<HomePage />} path="/" />

        {!currentUser ? renderForNonLoggedUsers() : renderForLoggedUsers()}

        {/* if use is trying to go somewhere they shouldn't be */}
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </div>
  );
}

export default RoutesList;
