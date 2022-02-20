import React, { useState }  from 'react';
import { Modal, InputNumber, Form, Input, Image } from 'antd';

const AddItemModal = ({ visible, onCreate, onCancel, collectionKey }) => {
    const [form] = Form.useForm();
    const [addItemImageUrl, setAddItemImageUrl] = useState("");

    return (
        <Modal
            visible={visible}
            title="Create a new item"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel()
                setAddItemImageUrl("")
            }}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values, collectionKey);
                    setAddItemImageUrl("")
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
                onValuesChange={(changedValues, allValues) => {
                    console.log(changedValues);
                    setAddItemImageUrl(allValues.itemImageUrl)
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input the name of item!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                    {
                        type: 'number',
                        required: true,
                        message: 'Please input the price of item!',
                    },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <div style={{ textAlign: "center", margin: "1rem" }} >
                    <Image
                        width={200}
                        src={addItemImageUrl ? addItemImageUrl : "error"}
                        fallback="https://si.secda.info/usc_creativemgnt1072/wp-content/themes/koji/assets/images/default-fallback-image.png"
                    />
                </div>
                <Form.Item 
                    name="itemImageUrl" 
                    label="ImageUrl"
                    rules={[
                        {
                            type: "url",
                            required: true,
                            message: 'Please input the imageUrl of item!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddItemModal;