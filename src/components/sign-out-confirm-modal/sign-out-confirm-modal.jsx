import React from "react";

import { useDispatch } from "react-redux";

import Modal from "../modal/modal";
import CustomButton from "../custom-button/custom-button";

import { signOutStart } from "../../redux/user/user.action";

import "./sign-out-confirm-modal.scss";

const SignOutConfirmModal = ({CloseModal}) => {
    const dispatch = useDispatch();

    return (
        <Modal confirmSignOutBackgroundStyles confirmSignOutModalStyles backgroundCloseModal={CloseModal}>
            <div className="confirm-signout-modal-container" >
                <div className="signout-title" >Are you sure to sign out?</div>
                <div className="cancle-signout-button" >
                    <CustomButton onClick={() => {
                        CloseModal();
                    }} >Cancel</CustomButton>
                    <CustomButton onClick={() => {
                        dispatch(signOutStart())
                        CloseModal();
                    }} >Sign out</CustomButton>
                </div>
            </div>
        </Modal>
    );
}

export default SignOutConfirmModal;