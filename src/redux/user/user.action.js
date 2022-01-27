import { UserActionTypes } from "./user.action.type";

export const signUpStart = (emailAndPasswordAndDisplayName) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: emailAndPasswordAndDisplayName
});

export const signUpSuccess = (user) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: user 
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const facebookSignInStart = () => ({
    type: UserActionTypes.FACEBOOK_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSessionStart = () => ({
    type: UserActionTypes.CHECK_USER_SESSION_START
})

export const checkUserSessionSuccess = () => ({
    type: UserActionTypes.CHECK_USER_SESSION_SUCCESS
})

export const signOutStart = (cartItems) => ({
    type: UserActionTypes.SIGN_OUT_START,
    payload: cartItems
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const updateUserPhotoStart = (photoFile) => ({
    type: UserActionTypes.UPDATE_USER_PHOTO_START,
    payload: photoFile
})

export const updateUserPhotoSuccess = () => ({
    type: UserActionTypes.UPDATE_USER_PHOTO_SUCCESS,
})

export const updateUserPhotoFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_PHOTO_FAILURE,
    payload: error
})

export const updateUserInfoStart = (userinfo) => ({
    type: UserActionTypes.UPDATE_USER_INFO_START,
    payload: userinfo
})

export const updateUserInfoSuccess = () => ({
    type: UserActionTypes.UPDATE_USER_INFO_SUCCESS,
})

export const updateUserInfoFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_INFO_FAILURE,
    payload: error
})

export const userResetPasswardStart = (email) => ({
    type: UserActionTypes.USER_RESET_PASSWARD_START,
    payload: email
})

export const userResetPasswardSuccess = () => ({
    type: UserActionTypes.USER_RESET_PASSWARD_SUCCESS,
})

export const userResetPasswardFailure = (error) => ({
    type: UserActionTypes.USER_RESET_PASSWARD_FAILURE,
    payload: error
})