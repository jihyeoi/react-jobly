import HomePage from "./HomePage";
import CompaniesList from "./CompaniesList";
import {Route, Routes, Navigate} from "react-router-dom";
import JobsList from "./JobsList";
import CompanyDetails from "./CompanyDetails";
import SingupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import {useContext} from "react";
import userContext from "./userContext";

/**
 * Routes list
 *
 * Props: None
 *
 * State: None
 *
 * App -> RoutesList -> CompanyDeatail, JobList, CompanyList, Homepage
 */
function RoutesList({register, login}) {
  const {currentUser} = useContext(userContext);

  function renderForLoggedUsers() {
    return (
      <>
        <Route element={<CompaniesList />} path="/companies" />
        <Route element={<JobsList />} path="/jobs" />
        <Route element={<CompanyDetails />} path="/companies/:name" />
        <Route element={<ProfileForm />} path="/profile" />
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
  //TODO: On line 49, change username conditional === null
  return (
    <div>
      <Routes>
        <Route element={<HomePage />} path="/" />

        {!currentUser.user ? renderForNonLoggedUsers() : renderForLoggedUsers()}

        <Route element={<HomePage />} path="*" />
      </Routes>
    </div>
  );
}

export default RoutesList;
