import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.action.type";

import { auth, goolgeProvider, Facebookprovider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from "./user.action";

export function* signUp(signUpObject) {
    // 得到的是signInWithEmail這個action(一個object)
    const { email, password, displayName } = signUpObject.payload;
    try{
        const data = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, data.user, {displayName});
        const userSnapShot = yield userRef.get();
        yield put(signUpSuccess());
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    }catch(error) {
        put(signUpFailure(error))
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
        const userRef = yield call(createUserProfileDocument, data.user);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    }catch(error) {
        put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* signInWithGoogle() {
    try{
        const data = yield auth.signInWithPopup(goolgeProvider);
        const userRef = yield call(createUserProfileDocument, data.user);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    }catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSingInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithFacebook() {
    try{
        const data = yield auth.signInWithPopup(Facebookprovider);
        const userRef = yield call(createUserProfileDocument, data.user);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    }catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onFacebookSingInStart() {
    yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START, signInWithFacebook)
}

export function* checkUserSession() {
    try{
        const userData = yield getCurrentUser();
        if(userData) {
            const userRef = yield call(createUserProfileDocument, userData);
            const userSnapShot = yield userRef.get();
            yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
        } else if(!userData) {
            return
        }
    }catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession)
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
} 

export function* userSaga() {
    yield all([
        call(onGoogleSingInStart), 
        call(onFacebookSingInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
    ])
}