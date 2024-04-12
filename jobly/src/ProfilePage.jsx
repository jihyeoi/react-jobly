import React from "react";
import {useContext} from "react";
import userContext from "./userContext";
import {Navigate} from "react-router-dom";

function ProfilePage() {
    const {currentUser} = useContext(userContext);


    // if (currentUser.username === undefined) {
    //     return <Navigate to="/" />
    // }

    return (
        <div>
            I AM PROFILE PAGE
        </div>
    )
}

export default ProfilePage;