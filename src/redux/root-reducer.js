import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import notificationsReducer from "./notification/notification.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"]
}

const rootRedocer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    shop: shopReducer,
    notifications: notificationsReducer,
})

export default persistReducer(persistConfig, rootRedocer)