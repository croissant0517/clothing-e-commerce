import React, { useState, useEffect } from "react";
import { Table, Input, Space, Button, Popconfirm, Statistic, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import OrderDetailModal from "./order-datail-modal/order-datail-modal";
import { API_URL } from "../../../api/api-utils";

const AdminDashboardOrders = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetail, setOrderDetail] = useState({});
    const token = window.localStorage.getItem("token")

    const getColumnSearchProps = (data) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
            return (
                <div style={{ padding: 8 }} >
                    <Input 
                        autoFocus={true}
                        placeholder={`Search by ${data}`}
                        value={selectedKeys[0]}
                        onChange={(event) => {
                            setSelectedKeys(event.target.value ? [event.target.value] : [])
                        }}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >Search</Button>
                        <Button
                            onClick={() => {
                                clearFilters()
                            }}
                            size="small"
                            style={{ width: 90 }}
                        >Reset</Button>
                    </Space>
                </div>
            )
        },
        filterIcon: <SearchOutlined style={{ color: '#1890ff', fontSize: "16px" }}/>,
        onFilter: (value, record) => {
            return record[data].toString().toLowerCase().includes(value.toLowerCase());
        }
    })

    const handleGetOrders = () => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/orders`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            setOrdersData(res.data)
            setIsLoading(false);
        })
        .catch((error) => {
            message.error("Fail get order")
        })
    }

    const handleDelete = (uid) => {
        axios({
            method: "POST",
            url: `${API_URL}/admin/orders/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                uid: uid,
            },
        })
        .then((res) => {
            handleGetOrders();
            message.success("Success delete order")
        })
        .catch((error) => {
            message.error("Fail delete order")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    }

    const columns = [
        {
            title: 'OrderId',
            dataIndex: 'key',
            key: 'key',
            ...getColumnSearchProps('key'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Creation Time',
            dataIndex: 'orderCreatedTime',
            key: 'orderCreatedTime',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => (
                <Typography.Link
                onClick={() => {
                    setOrderDetail(record.detail)
                    setIsModalVisible(true)
                }}
                >
                    Detail
                </Typography.Link>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a href="/" >Delete</a>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        let unmounted = false;
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/orders`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (!unmounted) {
                setOrdersData(res.data)
                setIsLoading(false);
            }
        })
        .catch((error) => {
            message.error("Fail get order")
        })
        return (
            () => {
                unmounted = true;
            }
        )
    }, [])


    return (
        <>
            <Statistic title="Orders" value={ordersData.length} />
            <Table loading={isLoading} columns={columns} dataSource={ordersData} />
            <OrderDetailModal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
                detail={orderDetail}
            />
        </>
    )
}

export default AdminDashboardOrders;