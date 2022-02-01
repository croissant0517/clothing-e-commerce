import React, { useState } from "react"
import OrderDetailModal from "../order-detail-modal/order-detail-modal";
import "./user-history-order-item.scss";


const UserHistoryOrderItem = ({orderItem}) => {
    const [toggleDisplayOrderDetailModal, setToggleDisplayOrderDetailModal] = useState(false);

    return (
        <div>
            <div className="user-history-order-item" >
                <div className="user-history-order-item-content" >
                    {orderItem.state.toUpperCase()}
                </div>
                <div className="user-history-order-item-content" >
                    {orderItem.orderCreatedTime}
                </div>
                <div className="user-history-order-item-content" >
                    ${(orderItem.amount/100).toFixed(2)}
                </div>
                <div className="user-history-order-item-content" >
                    <button onClick={() => setToggleDisplayOrderDetailModal(!toggleDisplayOrderDetailModal)} >Detail</button>
                </div>
            </div>
            {
                toggleDisplayOrderDetailModal 
                ? 
                <OrderDetailModal 
                    orderItem={orderItem}
                    closeModal = {() => setToggleDisplayOrderDetailModal(false)}
                /> 
                : 
                null
            }
        </div>
    )
}

export default UserHistoryOrderItem;