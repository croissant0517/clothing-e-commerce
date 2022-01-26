import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserPhotoStart, updateUserInfoStart } from "../../redux/user/user.action";

import CustomButton from "../custom-button/custom-button";
import FormInput from "../form-input/form-input";

import "./profile-detail.scss";
import { useEffect } from "react";

const ProfileDetail = (props) => {
    const { id, photoURL, displayName, email} = props.currentUser
    const [userInfo, setUserInfo] = useState({
        displayName,
        email,
    });
    const [userInfoToUpdate, setUserInfoToUpdate] = useState({
        displayName,
    });
    const [uploadImageFile, setUploadImageFile] = useState(undefined);
    const [toggleChangeUserPhoto, setToggleChangeUserPhoto] = useState(true);
    const [toggleChangeUserInfo, setToggleChangeUSerInfo] = useState(false);
    const dispatch = useDispatch();

    const handleChangeImageFile = (e) => {
        if (e.target.files[0]) {
            setUploadImageFile(e.target.files[0]);
        }
    }

    const handleChangeUserInfo = (e) => {
        setUserInfoToUpdate({
            ...userInfoToUpdate,
            [e.target.name]: e.target.value
        })
    }

    const handleToggleChangeUserPhoto = () => {
        setToggleChangeUserPhoto(!toggleChangeUserPhoto);
    }

    const handleToggleChangeUserInfo = () => {
        setToggleChangeUSerInfo(!toggleChangeUserInfo);
    }

    const handleUploadImageFile = () => {
        dispatch(updateUserPhotoStart({uploadImageFile, id}));
        handleToggleChangeUserPhoto();
        setUploadImageFile(undefined);
    }

    const handleCancleUploadUserInfo = () => {
        setUserInfo({
            displayName,
            email,
        })
        setUserInfoToUpdate({
            displayName,
            email,
        })
        handleToggleChangeUserInfo()
    }

    const handleUploadUserInfo = () => {
        dispatch(updateUserInfoStart(userInfoToUpdate));
        handleToggleChangeUserInfo()
    }

    useEffect(
        () => {
            setUserInfo({
                displayName,
                email,
            })
        }
    , [displayName, email])

    return (
        <div className="profile-detail-container" >
            <div className="profile-detail" >
                <h1>Account Profile</h1>
                <div className="user-photo" style = {{ backgroundImage: `url(${ photoURL })` }} ></div>
                <div className="user-photo-button-area" >
                    {toggleChangeUserPhoto ? <CustomButton onClick={handleToggleChangeUserPhoto} >
                        change photo
                    </CustomButton>
                    :
                    <div className="button-area-upload">
                        <div className="custom-file-upload">
                            <input type="file" onChange={handleChangeImageFile} ></input>
                        </div>
                        <CustomButton onClick={uploadImageFile && handleUploadImageFile} >Upload</CustomButton>
                        <CustomButton onClick={handleToggleChangeUserPhoto} >Cancle</CustomButton>
                    </div>}
                </div>
                <div className="user-info" >
                    <div className="user-info-form" >
                        <div className="user-info-title" >Name :</div>
                        <div className="user-info-value" >
                            {toggleChangeUserInfo ? 
                            <FormInput 
                                name="displayName" 
                                value={userInfoToUpdate.displayName} 
                                handleChange={handleChangeUserInfo} 
                            /> : userInfo.displayName}
                        </div>
                    </div>
                    <div className="user-info-form" >
                        <div className="user-info-title" >Email :</div>
                        <div className="user-info-value" >{userInfo.email}</div>
                    </div>
                </div>
                {toggleChangeUserInfo ? 
                    (
                        <div className="edit-file-button-area" >
                            <CustomButton onClick={handleUploadUserInfo} >change</CustomButton>
                            <CustomButton onClick={handleCancleUploadUserInfo} >cancle</CustomButton>
                        </div>
                    )
                    :
                    <CustomButton onClick={handleToggleChangeUserInfo} >edit file</CustomButton>
                }
            </div>
        </div>
    )
}

export default ProfileDetail;