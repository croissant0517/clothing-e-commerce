import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;