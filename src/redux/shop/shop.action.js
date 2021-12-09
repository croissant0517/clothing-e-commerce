import { ShopActionTypes } from "./shop.action.type";

export const updateCollections = (collectionsMap) => {
    return ({
        type: ShopActionTypes.UPDATE_CLLECTIONS,
        payload: collectionsMap
    });
}