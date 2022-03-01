import React from "react";
import { IoClose } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../redux/notification/notification.action";
import { selectNotifications } from "../../redux/notification/notification.selectors";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


import "./notification.scss";

const Notification = () => {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    return (
        <TransitionGroup>
            {
                notifications.map((notification) => (
                    <CSSTransition timeout={500} key={notification.id} classNames="notification" >
                        <div
                            className="notification-container" 
                            style={ notifications.length ? { width: "100%" } : { width: 0 }}
                            onClick={() => dispatch(removeNotification())}
                        >
                            <div className="notification" >
                                <IoClose onClick={() => dispatch(removeNotification(notification.id))} className="close-button"/>
                                <div className="head" >
                                    <h4>
                                        {notification.title}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                ))
            }
            {/* <div className="notification" >
                <IoClose className="close-button"/>
                <div className="head" >
                    <h4>
                        標題
                    </h4>
                </div>
            </div> */}
        </TransitionGroup>
    )
}

export default Notification;