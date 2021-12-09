import SHOP_DATA from "./shop.data";
import { ShopActionTypes } from "./shop.action.type";

const INTIIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INTIIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_CLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;