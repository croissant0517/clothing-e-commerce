import { takeLatest, all, call, put } from "redux-saga/effects";

import { UserActionTypes } from "../user/user.action.type";
import { clearCart } from "./cart.action";

export function* SignOutSuccessClearCart() {
    yield put(clearCart())
}

export function* onSignOutSuccessClearCart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, SignOutSuccessClearCart)
}

export function* cartSaga() {
    yield all([call(onSignOutSuccessClearCart)])
}