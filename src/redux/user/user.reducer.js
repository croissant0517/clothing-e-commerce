import { UserActionTypes } from "./user.action.type";

const INITIAL_STATE = {
    currentUser: null,
    error: undefined,
    checkUserSessionOnLoasding: true,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: undefined,
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: undefined
            }
        case UserActionTypes.UPDATE_USER_PHOTO_SUCCESS:
            return {
                ...state,
                error: undefined
            }
        case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                error: undefined
            }
        case UserActionTypes.CHECK_USER_SESSION_SUCCESS:
            return {
                ...state,
                checkUserSessionOnLoasding: false,
                error: undefined
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.UPDATE_USER_PHOTO_FAILURE:
        case UserActionTypes.UPDATE_USER_INFO_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;