import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserPhotoStart, updateUserInfoStart, userGetHistoryOrdersStart } from "../../redux/user/user.action";
import { selectUserHistoryOrders } from "../../redux/user/user.selectors";
import CustomButton from "../custom-button/custom-button";
import FormInput from "../form-input/form-input";
import UserHistoryOrderItem from "../user-history-order-item/user-history-order-item";

import "./profile-detail.scss";

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
    const userHistoryOrder = useSelector(selectUserHistoryOrders);

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
            dispatch(userGetHistoryOrdersStart(email))
        }
    , [displayName, email, dispatch])

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
                <h3>Order history</h3>
                <div className="user-history-order" >
                    <div className="user-history-order-header" >
                        <div className="user-history-order-header-content" >
                            <span>Order State</span>
                        </div>
                        <div className="user-history-order-header-content" >
                            <span>Order Create Time</span>
                        </div>
                        <div className="user-history-order-header-content" >
                            <span>Order Amount</span>
                        </div>
                        <div className="user-history-order-header-content" >
                            <span>Order Detail</span>
                        </div>
                    </div>
                    <div className="user-history-order-items" >
                        {
                            userHistoryOrder.map((orderItem) => {
                                return (
                                    <UserHistoryOrderItem key={orderItem.id} orderItem={orderItem} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail;