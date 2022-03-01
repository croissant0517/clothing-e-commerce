import React, { useState, useEffect } from "react";
import { Table, Input, Space, Button, Popconfirm, Statistic, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import { API_URL } from "../../../api/api-utils";

const isPureChinese = (input) => {  
    var reg = /^[\u4E00-\u9FA5]+$/
    if (reg.test(input)) {
        return true
    } else {
        return false
    }
}

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const AdminDashboardUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            if (record[data]) {
                if (isPureChinese(record[data])) {
                    return record[data].toString().includes(value);
                } else {
                    return record[data].toString().toLowerCase().includes(value.toLowerCase());
                }
            } else {
                return null
            }
        }
    })

    const handleGetUsers = () => {
        const token = window.localStorage.getItem("token")
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/user`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
            .then(json => {
                const users = json.data.map((data) => {
                    return {
                        key: data.uid,
                        name: data.displayName,
                        email: data.email,
                        lastSignInTime: formatDate(data.metadata.lastSignInTime),
                        creationTime: formatDate(data.metadata.creationTime),
                    }
                })
                setUsersData(users);
                setIsLoading(false);
                console.log(json.data);
            })
            .catch((error) => message.error("Fail get users"));
    }

    const handleDelete = (uid) => {
        const token = window.localStorage.getItem("token")
        axios({
            method: "DELETE",
            url: `${API_URL}/admin/user/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
            data: {
                uid: uid,
            },
        })
        .then((res) => {
            message.success('Success delete user');
            handleGetUsers();
        })
        .catch((error) => {
            message.error('Fail delete user');
            if (error.response.data) {
                message.error(error.response.data)
            }
            handleGetUsers();
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps("name"),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps("email"),
        },
        {
            title: 'Last Signin Time',
            dataIndex: 'lastSignInTime',
            key: 'lastSignInTime',
        },
        {
            title: 'Creation Time',
            dataIndex: 'creationTime',
            key: 'creationTime',
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
        const token = window.localStorage.getItem("token")
        axios({
            method: "GET",
            url: `${API_URL}/admin/user`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
            .then(json => {
                const users = json.data.users.map((data) => {
                    return {
                        key: data.uid,
                        name: data.displayName,
                        email: data.email,
                        lastSignInTime: formatDate(data.metadata.lastSignInTime),
                        creationTime: formatDate(data.metadata.creationTime),
                    }
                })
                if (!unmounted)  {
                    setUsersData(users);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                message.error("Fail get users")
                console.log(error);
            });
        return () => {
            unmounted = true;
        }
    }, [])


    return (
        <>
            <Statistic title="Users" value={usersData.length} />
            <Table loading={isLoading} columns={columns} dataSource={usersData} />
        </>
    )
}

export default AdminDashboardUsers;