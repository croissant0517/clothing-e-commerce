import SHOP_DATA from "./shop.data";

const INTIIAL_STATE = {
    collections:  SHOP_DATA
}

const shopReducer = (state = INTIIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default shopReducer;