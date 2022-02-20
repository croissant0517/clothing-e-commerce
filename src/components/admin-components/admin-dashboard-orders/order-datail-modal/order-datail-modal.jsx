import React from 'react';
import { Modal, Table, Image} from 'antd';

const OrderDetailModal = ({isModalVisible, setIsModalVisible, detail}) => {
    const {name, paymentMethodTypes, shipping, orderItems} = detail;

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name'},
        { title: 'Price', dataIndex: 'price', key: 'price'},
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
        { 
            title: 'ImageUrl', 
            dataIndex: 'imageUrl', 
            key: 'imageUrl',
            width: "10%",
            render: (text) => (
                <Image
                    width={100}
                    src={text}
                />
            )
        },
    ];

    return (
        <Modal title="Order Detail" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <p>Receiver : {name}</p>
            <p>PaymentMethod : {paymentMethodTypes}</p>
            {shipping && <p>Shipping : {shipping.postal_code} {shipping.country} {shipping.city} {shipping.line1}</p>}
            <Table
                title={() => <h4>Your Order :</h4>}
                columns={columns}
                dataSource={orderItems}
                pagination={{
                    pageSize: 2,
                }}
            />
        </Modal>
    );
};

export default OrderDetailModal;