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
    message
} from 'antd';
import AddSliderModal from "./add-slider-modal/add-slider-modal";
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

const AdminDashboardSlider = () => {
    const [slidersData, setSlidersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [addSliderModalVisible, setAddSliderModalVisible] = useState(false);
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

    const createSlider = (values) => {
        const { 
            title, 
            sliderImageUrl, 
        } = values;
        const createUniqueId = () => {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
                + Math.random().toString(16).slice(2)
                + Date.now().toString(16).slice(4);
        };
        axios({
            method: "POST",
            url: `${API_URL}/admin/sliders/add`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                slider: {
                    id: createUniqueId(),
                    title: title,
                    imageUrl: sliderImageUrl
                }
            },
        })
        .then((res) => {
            setAddSliderModalVisible(false);
            handleGetSliders();
            message.success("Success create slider")
        })
        .catch((error) => {
            setAddSliderModalVisible(false);
            message.error("Fail create slider")
            if (error.response.data) {
                message.error(error.response.data)
            }
        })
    };

    const saveSlider = async (key) => {
        try {
            const row = await form.validateFields();
            axios({
                method: "PUT",
                url: `${API_URL}/admin/sliders/update`,
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
                handleGetSliders();
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

    const deleteSlider = (slider) => {
        const { title, imageUrl } = slider;
        axios({
            method: "DELETE",
            url: `${API_URL}/admin/sliders/delete`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            data: {
                slider: {
                    title,
                    imageUrl,
                }
            },
        })
        .then((res) => {
            handleGetSliders();
            message.success("Success delete slider")
        })
        .catch((error) => {
            message.error("Fail delete slider")
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
                            onConfirm={() => saveSlider(record.key)}
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
                    deleteSlider(record)
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

    const handleGetSliders = () => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/sliders`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            setSlidersData(res.data)
            setIsLoading(false);
        })
        .catch((error) => {
            message.error("Fail get sliders")
        })
    }

    useEffect(() => {
        let unmounted = false;
        setIsLoading(true);
        axios({
            method: "GET",
            url: `${API_URL}/admin/sliders`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (!unmounted) {
                setSlidersData(res.data)
                setIsLoading(false);
            }
        })
        .catch((error) => {
            message.error("Fail get sliders")
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
                onClick={() => setAddSliderModalVisible(true)}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a Slider
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
                    dataSource={slidersData}
                />
            </Form>
            <AddSliderModal
                onCreate={createSlider}
                onCancel={() => {
                    setAddSliderModalVisible(false);
                }}
                visible={addSliderModalVisible}
            />
        </>
    )
}

export default AdminDashboardSlider;