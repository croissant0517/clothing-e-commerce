import { takeEvery, all, call, put, delay } from "redux-saga/effects";

import { CartActionTypes } from "../cart/cart.action.type";
import { NotificationActionTypes } from "./notification.action.type";
import { UserActionTypes } from "../user/user.action.type";

import { addNotification, removeNotification } from "./notification.action";

export function* updateUserInfoSuccessNotification() {
    yield put(addNotification("Success Update!"));
}

export function* onUpdateUserInfoSuccessNotification() {
    yield takeEvery(UserActionTypes.UPDATE_USER_INFO_SUCCESS, updateUserInfoSuccessNotification)
}

export function* addItemNotification() {
    yield put(addNotification("Add to cart"));
}

export function* onAddItemNotification() {
    yield takeEvery(CartActionTypes.ADD_ITEM, addItemNotification)
}

export function* removeItemNotification(addNotificationObject) {
    yield delay(4000)
    yield put(removeNotification(addNotificationObject.payload.id));
}

export function* onRemoveItemNotification() {
    yield takeEvery(NotificationActionTypes.ADD_NOTIFICATION, removeItemNotification)
}

export function* notificationSaga() {
    yield all([call(onAddItemNotification), call(onRemoveItemNotification), call(onUpdateUserInfoSuccessNotification)])
}