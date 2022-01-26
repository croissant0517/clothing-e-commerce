import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.action.type";

import { auth, goolgeProvider, Facebookprovider, createUserProfileDocument, getCurrentUser, storage, firestore } from "../../firebase/firebase.utils";

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
    updateUserPhotoSuccess,
    updateUserPhotoFailure,
    checkUserSessionStart,
    checkUserSessionSuccess,
    updateUserInfoSuccess,
    updateUserInfoFailure,
} from "./user.action";

import { addItem } from "../cart/cart.action";

export function* signUp(signUpObject) {
    // 得到的是signUpObject這個action(一個object)
    const { email, password, displayName } = signUpObject.payload;
    try{
        const data = yield auth.createUserWithEmailAndPassword(email, password);
        // 使用密碼與郵件註冊，Auth內沒有辦法帶入displayName，所以在第一次註冊時馬上更新displayName
        yield auth.currentUser.updateProfile({
            displayName: displayName
        })
        const userData = yield getCurrentUser();
        yield call(createUserProfileDocument, data.user, {displayName: displayName});
        // const userSnapShot = yield userRef.get();
        yield put(signUpSuccess());
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL }));
    }catch(error) {
        yield put(signUpFailure(error.code))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInWithEmail(signInWithEmailActionObject) {
    // 得到的是signInWithEmail這個action(一個object)
    const { email, password } = signInWithEmailActionObject.payload
    try{
        const data = yield auth.signInWithEmailAndPassword(email, password)
        const userData = data.user
        const userRef = yield call(createUserProfileDocument, data.user);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL, phoneNumber: userData.phoneNumber }));
        for(let i = 0; i < userSnapShot.data().cartItems.length; i++) {
            yield put(addItem(userSnapShot.data().cartItems[i]));
        }
    }catch(error) {
        yield put(signInFailure(error.code))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* signInWithGoogle() {
    try{
        const data = yield auth.signInWithPopup(goolgeProvider);
        const userData = data.user
        const userRef = yield call(createUserProfileDocument, userData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL, phoneNumber: userData.phoneNumber }))
        for(let i = 0; i < userSnapShot.data().cartItems.length; i++) {
            yield put(addItem(userSnapShot.data().cartItems[i]));
        }
    }catch(error) {
        yield put(signInFailure(error.code))
    }
}

export function* onGoogleSingInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithFacebook() {
    try{
        const data = yield auth.signInWithPopup(Facebookprovider);
        const userData = data.user
        const userRef = yield call(createUserProfileDocument, userData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL, phoneNumber: userData.phoneNumber }))
        for(let i = 0; i < userSnapShot.data().cartItems.length; i++) {
            yield put(addItem(userSnapShot.data().cartItems[i]));
        }
    }catch(error) {
        yield put(signInFailure(error.code))
    }
}

export function* onFacebookSingInStart() {
    yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START, signInWithFacebook)
}

export function* checkUserSession() {
    try{
        const userData = yield getCurrentUser();
        if(userData) {
            yield call(createUserProfileDocument, userData);
            yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL, phoneNumber: userData.phoneNumber }))
            yield put(checkUserSessionSuccess());
        } else if(!userData) {
            yield put(checkUserSessionSuccess());
        }
    }catch(error) {
        yield put(signInFailure(error.code))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, checkUserSession)
}

export function* signOut(signOutObject) {
    const cartItems = signOutObject.payload
    try{
        const userData = yield getCurrentUser();
        const userRef = firestore.doc(`users/${userData.uid}`);
        const snapShot = yield userRef.get();
        if (snapShot.exists) {
            yield userRef.update({
                cartItems
            })
        }
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(error) {
        yield put(signOutFailure(error.code))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* updateUserPhoto(updataPhotoStartActionObject) {
    const {uploadImageFile, id} = updataPhotoStartActionObject.payload
    const storageRef = storage.ref(`${id}/images/${uploadImageFile.name}`);
    try{
        yield storageRef.put(uploadImageFile);
        const imageUploadURL = yield storageRef.getDownloadURL();
        yield auth.currentUser.updateProfile({
            photoURL: imageUploadURL,
        })
        yield put(checkUserSessionStart())
        yield put(updateUserPhotoSuccess())
    }catch(error) {
        yield put(updateUserPhotoFailure(error.code))
    }
}

export function* onUpdateUserPhoto() {
    yield takeLatest(UserActionTypes.UPDATE_USER_PHOTO_START, updateUserPhoto)
}

export function* updateUserInfo(updataUserInfoStartActionObject) {
    const userInfo = updataUserInfoStartActionObject.payload
    try{
        yield auth.currentUser.updateProfile({
            displayName: userInfo.displayName,
        })
        yield put(checkUserSessionStart())
        yield put(updateUserInfoSuccess())
    }catch(error) {
        yield put(updateUserInfoFailure(error.code))
    }
}

export function* onUpdateUserInfo() {
    yield takeLatest(UserActionTypes.UPDATE_USER_INFO_START, updateUserInfo)
}

export function* userSaga() {
    yield all([
        call(onGoogleSingInStart), 
        call(onFacebookSingInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onUpdateUserPhoto),
        call(onUpdateUserInfo),
    ])
}