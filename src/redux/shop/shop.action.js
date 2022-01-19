import { ShopActionTypes } from "./shop.action.type";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
    return ({
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    });
}

export const fetchCollectionsSuccess = (collectionsMap) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
}

export const fetchCollectionsFailure = (error) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: error
    }
}

// Redux-Thunk

export const fetchCollectionsStartAsync = () => (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart())

    collectionRef.get().then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error)));
}