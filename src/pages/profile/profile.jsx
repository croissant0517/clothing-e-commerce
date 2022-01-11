import React from "react";

import ProfileDetail from "../../components/profile-detail/profile-detail";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./profile.scss";


const ProfilePage = (props) => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className="profile-container" >
            {currentUser && <ProfileDetail  currentUser={currentUser}/>}
        </div>
    )
}

export default ProfilePage;