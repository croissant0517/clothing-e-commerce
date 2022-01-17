import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.action.type";

import { auth, goolgeProvider, Facebookprovider, createUserProfileDocument, getCurrentUser, storage } from "../../firebase/firebase.utils";

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
    updateUserPhotoSuccess,
    updateUserPhotoFailure,
    checkUserSessionSuccess,
} from "./user.action";

export function* signUp(signUpObject) {
    // 得到的是signInWithEmail這個action(一個object)
    const { email, password, displayName } = signUpObject.payload;
    try{
        const data = yield auth.createUserWithEmailAndPassword(email, password);
        yield auth.currentUser.updateProfile({
            displayName: displayName
        })
        const userData = yield getCurrentUser();
        yield call(createUserProfileDocument, data.user, {displayName});

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
        yield call(createUserProfileDocument, data.user);
        // const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL }))
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
        yield call(createUserProfileDocument, userData);

        // const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL }))
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
        yield call(createUserProfileDocument, userData);
        // const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL }))
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
            // console.log(userRef);
            // const userSnapShot = yield userRef.get();
            // yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
            yield put(signInSuccess({ id: userData.uid, displayName: userData.displayName, email: userData.email, photoURL: userData.photoURL }))
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

export function* signOut() {
    try{
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
        yield put(updateUserPhotoSuccess(imageUploadURL))
    }catch(error) {
        yield put(updateUserPhotoFailure(error.code))
    }
}

export function* onUpdateUserPhoto() {
    yield takeLatest(UserActionTypes.UPDATE_USER_PHOTO_START, updateUserPhoto)
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
    ])
}