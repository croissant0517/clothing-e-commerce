import React from "react";

import ProfileDetail from "../../components/profile-detail/profile-detail";
import CustomButton from "../../components/custom-button/custom-button";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./profile.scss";


const ProfilePage = (props) => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className="profile-container" >
            {currentUser ? <ProfileDetail  currentUser={currentUser}/>
            : 
            (<div>
                <h2>Please sign in first</h2>
                <CustomButton onClick = {() => props.history.push('/signin')} >Go to Sign in</CustomButton>
            </div>)
            }
        </div>
    )
}

export default ProfilePage;