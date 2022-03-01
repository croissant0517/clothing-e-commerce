import { NotificationActionTypes } from "./notification.action.type";

export const addNotification = (notificationContent) => ({
    type: NotificationActionTypes.ADD_NOTIFICATION,
    payload: {
        id: Math.random(),
        title: notificationContent,
    }
});

export const removeNotification = (id) => ({
    type: NotificationActionTypes.REMOVE_NOTIFICATION,
    payload: {
        id: id,
    }
});