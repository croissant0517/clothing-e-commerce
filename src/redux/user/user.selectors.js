import { createSelector } from "reselect";

const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => (user.currentUser)
)

export const selectCheckUserSessionOnLoading = createSelector(
    [selectUser],
    (user) => (user.checkUserSessionOnLoasding)
)

export const selectError = createSelector(
    [selectUser],
    (user) => {
        switch (user.error) {
            case "auth/invalid-email":
                return "The email address is not valid"
            case "auth/user-disabled":
                return "The user corresponding to the given email has been disabled"
            case "auth/user-not-found":
                return "There is no user corresponding to the given email"
            case "auth/wrong-password":
                return "The password is invalid for the given email, or the account corresponding to the email does not have a password set"
            default:
                break;
        }
    }
)