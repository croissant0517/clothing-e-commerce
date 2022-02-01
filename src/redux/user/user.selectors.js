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

export const selectUserHistoryOrders = createSelector(
    [selectUser],
    (user) => (user.userHistoryOrders)
)

export const selectErrorForSignIn = createSelector(
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
            case "auth/account-exists-with-different-credential":
                return "Already exists an account with the email address"
            case "auth/popup-blocked":
                return "The popup was blocked by the browser"
            default:
                break;
        }
    }
)

export const selectErrorForSignUp = createSelector(
    [selectUser],
    (user) => {
        switch (user.error) {
            case "auth/email-already-in-use":
                return "Already exists an account with the given email"
            case "auth/invalid-email":
                return "Email address is not valid"
            case "auth/operation-not-allowed":
                return "Email/Password accounts are not enabled"
            case "auth/weak-password":
                return "Password is not strong enough(less than 6 chars)"
            default:
                break;
        }
    }
)

export const selectErrorForUserResetPassward = createSelector(
    [selectUser],
    (user) => {
        switch (user.error) {
            case "auth/invalid-email":
                return "Email address is not valid"
            case "auth/user-not-found":
                return "No user corresponding to the email address"
            default:
                break;
        }
    }
)

export const selectResultForUserResetPassward = createSelector(
    [selectUser],
    (user) => {
        switch (user.userResetPasswardResult) {
            case "success":
                return "Success! Please check your email"
            default:
                break;
        }
    }
)