import { UserActionTypes } from "./user.action.type";

const INITIAL_STATE = {
    currentUser: null,
    error: undefined
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: undefined
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
                currentUser: { ...state.currentUser, photoURL: action.payload },
                error: undefined
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.UPDATE_USER_PHOTO_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;