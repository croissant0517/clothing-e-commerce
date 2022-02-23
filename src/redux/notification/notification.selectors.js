import { createSelector } from "reselect";

const selectNotification = (state) => (state.notifications)

export const selectNotifications = createSelector(
    [selectNotification],
    (notifications) => (notifications.notifications)
)
