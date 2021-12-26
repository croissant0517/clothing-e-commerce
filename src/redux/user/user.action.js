import { UserActionTypes } from "./user.action.type";

export const setCurrentUser = (user) => {
    return ({
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user
    });
}