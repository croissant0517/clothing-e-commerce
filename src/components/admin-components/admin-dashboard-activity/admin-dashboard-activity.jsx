import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    Table, 
    Form, 
    Typography, 
    Input, 
    InputNumber, 
    Popconfirm, 
    Button,
    message,
} from 'antd';
import AddActivityModal from "./add-activity-modal/add-activity-modal"
import { API_URL } from "../../../api/api-utils";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                {
                    required: true,
                    message: `Please Input ${title}!`,
                },
                ]}
            >
                {inputNode}
            </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const AdminDashboardActivity = () => {
    const [activityData, setActivityData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [addActivityModalVisible, setAddActivityModalVisible] = useState(false);
    const token = window.localStorage.getItem("token")

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            title: '',
            imageUrl: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const createActivity = (values) => {
        console.log('Received values of form: ', values);
        const { 
            title,
        } = values;
        axios({
            method: "POST",
            url: `${API_URL}/admin/activity/add`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                title: title,
            },
        })
        .then((res) => {
            setAddActivityModalVisible(false);
            handleGetActivity();
            message.success("Success create activity");
        })
        .catch((error) => {
            setAddActivityModalVisible(false);
            message.error("Fail delete activity");
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const saveActivity = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row);
            axios({
                method: "PUT",
                url: `${API_URL}/admin/activity/update`,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token 
                },
                data: {
                    id: key,
                    title: row.title,
                },
            })
            .then((res) => {
                setEditingKey('');
                handleGetActivity();
                message.success("Success save")
            })
            .catch((error) => {
                setEditingKey('');
                message.error("Fail save")
                if (error.response.data) {
                    message.error(error.response.data)
                }
            })
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteActivity = (activity) => {
        const { key } = activity;
        axios({
            method: "DELETE",
            url: `${API_URL}/admin/activity/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                uid: key,
            },
        })
        .then((res) => {
            handleGetActivity();
            message.success("Success delete activity")
        })
        .catch((error) => {
            message.error("Fail delete activity")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title', editable: true },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm 
                            title="Sure to save?"
                            onConfirm={() => saveActivity(record.key)}
                        >
                            <a href="/" >Save</a>
                        </Popconfirm>
                        <Typography.Link
                            onClick={cancel}
                            style={{
                            marginLeft: 8,
                            }}
                        >
                            Cancel
                        </Typography.Link>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: "8%",
            render: (record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => {
                    deleteActivity(record)
                }}>
                    <a href="/" >Delete</a>
                </Popconfirm>
            ),
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text' ,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleGetActivity = () => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/activity`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            setActivityData(res.data)
            setIsLoading(false);
        })
        .catch((error) => {
            message.error("Fail get activity")
        })
    }

    useEffect(() => {
        let unmounted = false;
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/activity`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (!unmounted) {
                setActivityData(res.data)
                setIsLoading(false);
            }
        })
        .catch((error) => {
            message.error("Fail get activity")
        })
        return (
            () => {
                unmounted = true;
            }
        )
    }, [])

    return (
        <>
            <Button
                onClick={() => setAddActivityModalVisible(true)}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a Activity
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowClassName="editable-row"
                    loading={isLoading}
                    columns={mergedColumns}
                    pagination={{
                        onChange: cancel,
                    }}
                    dataSource={activityData}
                />
            </Form>
            <AddActivityModal
                onCreate={createActivity}
                onCancel={() => {
                    setAddActivityModalVisible(false);
                }}
                visible={addActivityModalVisible}
            />
        </>
    )
}

export default AdminDashboardActivity;