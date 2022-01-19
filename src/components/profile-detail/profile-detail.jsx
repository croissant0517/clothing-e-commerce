import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserPhotoStart } from "../../redux/user/user.action"; 

import CustomButton from "../custom-button/custom-button";

import "./profile-detail.scss";

const ProfileDetail = (props) => {
    const { id, photoURL, displayName } = props.currentUser
    const [uploadImageFile, setUploadImageFile] = useState(undefined);
    const [toggleChangeUserPhoto, setToggleChangeUserPhoto] = useState(true);
    const dispatch = useDispatch();

    const handleChangeImageFile = (e) => {
        if (e.target.files[0]) {
            setUploadImageFile(e.target.files[0]);
        }
    }

    const handleToggleChangeUserPhoto = () => {
        setToggleChangeUserPhoto(!toggleChangeUserPhoto);
    }

    const handleUploadImageFile = () => {
        dispatch(updateUserPhotoStart({uploadImageFile, id}));
        handleToggleChangeUserPhoto();
        setUploadImageFile(undefined);
    }

    return (
        <div className="profile-detail-container" >
            <div className="profile-detail" >
                <h1>Welcome {displayName} !</h1>
                <div className="user-photo" style = {{ backgroundImage: `url(${ photoURL })` }} ></div>
                <div className="button-area" >
                    {toggleChangeUserPhoto ? <CustomButton onClick={handleToggleChangeUserPhoto} >Change Photo</CustomButton>
                    :<div className="button-area-upload">
                        <div className="custom-file-upload">
                            <input type="file" onChange={handleChangeImageFile} ></input>
                        </div>
                        <CustomButton onClick={uploadImageFile && handleUploadImageFile} >Upload</CustomButton>
                        <CustomButton onClick={handleToggleChangeUserPhoto} >Cancle</CustomButton>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail;