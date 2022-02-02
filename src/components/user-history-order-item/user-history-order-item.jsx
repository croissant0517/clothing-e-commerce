import React, { useState, useEffect } from "react"
import OrderDetailModal from "../order-detail-modal/order-detail-modal";
import "./user-history-order-item.scss";


const UserHistoryOrderItem = ({orderItem}) => {
    const [toggleDisplayOrderDetailModal, setToggleDisplayOrderDetailModal] = useState(false);

    // 如果cart-modal開啟，則將body的滾輪禁止使用
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = toggleDisplayOrderDetailModal ? 'hidden' : null;
        return () => {
            body.style.overflow = "auto"
        }
    }, [toggleDisplayOrderDetailModal])

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