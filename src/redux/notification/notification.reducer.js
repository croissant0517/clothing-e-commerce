import { NotificationActionTypes } from "./notification.action.type";

const INITIAL_STATE = {
    notifications: []
}

// {
//     id: ,
//     title: ,
//     description: ,
// }

const notificationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NotificationActionTypes.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            }
        case NotificationActionTypes.REMOVE_NOTIFICATION:
            if(action.payload.id) {
                return {
                    ...state,
                    notifications: state.notifications.filter((notification) => (notification.id !== action.payload.id))
                }
            } else {
                return {
                    ...state,
                    notifications: []
                }
            }
        default:
            return state;
    }
}

export default notificationsReducer;