import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Modal from "../modal/modal";
import CustomButton from "../custom-button/custom-button";

import { signOutStart } from "../../redux/user/user.action";

import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./sign-out-confirm-modal.scss";

const SignOutConfirmModal = ({CloseModal}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    return (
        <Modal confirmSignOutBackgroundStyles confirmSignOutModalStyles backgroundCloseModal={CloseModal}>
            <div className="confirm-signout-modal-container" >
                <div className="signout-title" >Are you sure to sign out?</div>
                <div className="cancle-signout-button" >
                    <CustomButton onClick={() => {
                        CloseModal();
                    }} >Cancel</CustomButton>
                    <CustomButton onClick={() => {
                        dispatch(signOutStart(cartItems))
                        CloseModal();
                    }} >Sign out</CustomButton>
                </div>
            </div>
        </Modal>
    );
}

export default SignOutConfirmModal;