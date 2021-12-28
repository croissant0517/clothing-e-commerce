import { takeLatest, call, put } from "redux-saga/effects";

import { ShopActionTypes } from "./shop.action.type";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.action";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"; 

export function* fetchCollectionsAsync() {

    try{
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}