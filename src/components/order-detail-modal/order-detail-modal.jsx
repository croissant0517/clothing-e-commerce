import React from "react";
import Modal from "../modal/modal";
import "./order-detail-modal.scss";

const OrderDetailModal = ({orderItem, closeModal}) => {
    const { postal_code, country, city, line1 } = orderItem.detail.shipping;
    
    return (
        <Modal buttonCloseModal={closeModal} backgroundCloseModal={closeModal} OrderDetailBackgroundStyles orderDetailModalStyles >
            <div className="order-detail-modal-container" >
                <h2 className="order-detail-modal-container-title" >Order Detail</h2>
                <div className="order-detail-modal-shipping-info" >
                    <div className="order-detail-modal-shipping-info-titles" >
                        <div className="order-detail-modal-shipping-info-title" >
                            Order state:
                        </div>
                        <div className="order-detail-modal-shipping-info-title" >
                            Order amount:
                        </div>
                        <div className="order-detail-modal-shipping-info-title" >
                            Customer email:
                        </div>
                        <div className="order-detail-modal-shipping-info-title" >
                            Receiver's name:
                        </div>
                        <div className="order-detail-modal-shipping-info-title" >
                            Receiver's address:
                        </div>
                    </div>
                    <div className="order-detail-modal-shipping-info-values" >
                        <div className="order-detail-modal-shipping-info-value" >
                            {orderItem.state}
                        </div>
                        <div className="order-detail-modal-shipping-info-value" >
                            {(orderItem.amount/100).toFixed(2)}
                        </div>
                        <div className="order-detail-modal-shipping-info-value" >
                            {orderItem.email}
                        </div>
                        <div className="order-detail-modal-shipping-info-value" >
                            {orderItem.detail.name}
                        </div>
                        <div className="order-detail-modal-shipping-info-value" >
                            {postal_code}{country}{city}{line1}
                        </div>
                    </div>
                </div>
                <div className="order-detail-modal-products" >
                    <div className="order-detail-modal-items-header" >
                        <div className="order-detail-modal-items-header-title" >
                            Product
                        </div>
                        <div className="order-detail-modal-items-header-title" >
                            Amount
                        </div>
                        <div className="order-detail-modal-items-header-title" >
                            Quantity
                        </div>
                    </div>
                    <div className="order-detail-modal-items" >
                        {
                            orderItem.detail.orderItems.map((item) => {
                                return (
                                    <div key={item.id} className="order-detail-modal-item" >
                                        <div className="order-detail-modal-item-content" >
                                            <div className="order-detail-modal-item-content-img" style = {{ backgroundImage: `url(${ item.imageUrl })` }} ></div>
                                        </div>
                                        <div className="order-detail-modal-item-content" >
                                            ${item.price}
                                        </div>
                                        <div className="order-detail-modal-item-content" >
                                            {item.quantity}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default OrderDetailModal;