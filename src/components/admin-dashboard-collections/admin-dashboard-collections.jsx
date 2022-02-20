import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    Table, 
    Form, 
    Typography, 
    Input, 
    InputNumber, 
    Popconfirm, 
    Image, 
    Button,
    message,
} from 'antd';
import AddCollectionModal from "./admin-add-collection-modal/add-collection-modal";
import AddItemModal from "./add-item-modal/add-item-modal";
import { API_URL } from "../../api/api-utils";

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

const AdminDashboardCollections = () => {
    const [collectionsData, setCollectionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [addCollectionModalVisible, setAddCollectionModalVisible] = useState(false);
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
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

    const editItem = (record) => {
        form.setFieldsValue({
            name: '',
            imageUrl: '',
            price: 0,
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleGetCollections = () => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/collections`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            setCollectionsData(res.data)
            setIsLoading(false);
        })
        .catch((error) => message.error("Fail get collection"))
    }

    const createCollection = (values) => {
        console.log('Received values of form: ', values);
        const { 
            title, 
            collectionImageUrl, 
        } = values;
        axios({
            method: "POST",
            url: `${API_URL}/admin/collections/add`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                title: title,
                collectionImageUrl: collectionImageUrl,
                items: []
            },
        })
        .then((res) => {
            setAddCollectionModalVisible(false);
            handleGetCollections();
            message.success("Success create collection")
        })
        .catch((error) => {
            setAddCollectionModalVisible(false);
            message.error("Fail create collection")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const saveCollection = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row);
            axios({
                method: "PUT",
                url: `${API_URL}/admin/collections/update`,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token 
                },
                data: {
                    id: key,
                    title: row.title,
                    imageUrl: row.imageUrl,
                },
            })
            .then((res) => {
                setEditingKey('');
                handleGetCollections();
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

    const deleteCollection = (item) => {
        const { key } = item
        axios({
            method: "DELETE",
            url: `${API_URL}/admin/collections/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                uid: key,
            },
        })
        .then((res) => {
            handleGetCollections();
            message.success("Success delete collection")
        })
        .catch((error) => {
            message.error("Fail delete collection")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const createItem = (values, collectionKey) => {
        console.log('Received values of form: ', values);
        console.log(collectionKey);
        const uid = collectionKey;
        const {  
            name, 
            price, 
            itemImageUrl 
        } = values;
        axios({
            method: "POST",
            url: `${API_URL}/admin/collections/item/add`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                uid: uid,
                item: {
                    name: name,
                    price: price,
                    imageUrl: itemImageUrl,
                }
            },
        })
        .then((res) => {
            console.log(res);
            setAddItemModalVisible(false);
            handleGetCollections();
            message.success("Success create item")
        })
        .catch((error) => {
            setAddItemModalVisible(false);
            message.error("Fail create item")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const saveItem = async (item) => {
        console.log(item);
        try {
            const row = await form.validateFields();
            console.log(row);
            axios({
                method: "PUT",
                url: `${API_URL}/admin/collections/item/update`,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token 
                },
                data: {
                    uid: item.collectionId,
                    key: item.key,
                    name: row.name,
                    price: row.price,
                    imageUrl: row.imageUrl,
                },
            })
            .then((res) => {
                console.log(res);
                setEditingKey('');
                handleGetCollections();
                message.success("Success save")
            })
            .catch((error) => {
                setEditingKey('');
                message.success("Fail save")
                if (error.response.data) {
                    message.error(error.response.data)
                }
            })
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteItem = (item) => {
        console.log(item);
        axios({
            method: "DELETE",
            url: `${API_URL}/admin/collections/item/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                uid: item.collectionId,
                id: item.key,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
            },
        })
        .then((res) => {
            console.log(res);
            setEditingKey('');
            handleGetCollections();
            message.success("Success delete item")
        })
        .catch((error) => {
            setEditingKey('');
            message.error("Fail delete item")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title', editable: true },
        { 
            title: 'ImageUrl', 
            dataIndex: 'imageUrl', 
            key: 'imageUrl', 
            editable: true,
            render: (text) => (
                <Image
                    width={300}
                    src={text}
                />
            )
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm 
                            title="Sure to save?"
                            onConfirm={() => saveCollection(record.key)}
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
                    deleteCollection(record)
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
                inputType: col.dataIndex === 'title' && 'imageUrl',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const childColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name', editable: true },
        { title: 'Price', dataIndex: 'price', key: 'price', editable: true },
        { 
            title: 'ImageUrl', 
            dataIndex: 'imageUrl', 
            key: 'imageUrl', 
            editable: true,
            render: (text) => (
                <Image
                    height={200}
                    src={text}
                />
            )
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm 
                            title="Sure to save?"
                            onConfirm={() => saveItem(record)}
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
                    <Typography.Link disabled={editingKey !== ''} onClick={() => editItem(record)}>
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
                  deleteItem(record)
                }}>
                    <a href="/" >Delete</a>
              </Popconfirm>
            ),
        },
    ];

    const mergedChildColumns = childColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    useEffect(() => {
        let unmounted = false;
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/collections`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (!unmounted) {
                setCollectionsData(res.data)
                setIsLoading(false);
            }
        })
        .catch((error) => message.error("Fail create collection"))
        return (
            () => {
                unmounted = true;
            }
        )
    }, [])

    return (
        <>
            <Button
                onClick={() => setAddCollectionModalVisible(true)}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a collection
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
                    dataSource={collectionsData}
                    expandable={{
                        expandedRowRender: (record) => (
                            <>
                                <Button
                                    onClick={() => setAddItemModalVisible(true)}
                                    type="primary"
                                    style={{
                                        marginBottom: 16,
                                    }}
                                >
                                    Add a item
                                </Button>
                                <Form form={form} component={false}>
                                    <Table
                                        title={() => <h1 style={{ textAlign: "center" }} >Items</h1>}
                                        bordered={true}
                                        pagination={false}
                                        components={{
                                            body: {
                                                cell: EditableCell,
                                            },
                                        }}
                                        rowClassName="editable-row"
                                        columns={mergedChildColumns}
                                        dataSource={record.items}
                                        footer={() => <h1 style={{ height: "30px" }} >{}</h1>}
                                    />
                                </Form>
                                <AddItemModal
                                    collectionKey={record.key}
                                    onCreate={createItem}
                                    onCancel={() => {
                                        setAddItemModalVisible(false);
                                    }}
                                    visible={addItemModalVisible}
                                />
                            </>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                />
            </Form>
            <AddCollectionModal
                onCreate={createCollection}
                onCancel={() => {
                    setAddCollectionModalVisible(false);
                }}
                visible={addCollectionModalVisible}
            />
        </>
    )
}

export default AdminDashboardCollections;