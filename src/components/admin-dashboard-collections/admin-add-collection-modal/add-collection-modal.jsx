import React, { useState }  from 'react';
import { Modal, Form, Input, Image } from 'antd';

const AddCollectionModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [addCollectionImageUrl, setAddCollectionImageUrl] = useState("");

    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel()
                setAddCollectionImageUrl("")
            }}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
                    setAddCollectionImageUrl("")
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
                    setAddCollectionImageUrl(allValues.collectionImageUrl);
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div style={{ textAlign: "center", margin: "1rem" }} >
                    <Image
                        width={200}
                        src={addCollectionImageUrl ? addCollectionImageUrl : "error"}
                        fallback="https://si.secda.info/usc_creativemgnt1072/wp-content/themes/koji/assets/images/default-fallback-image.png"
                    />
                </div>
                <Form.Item 
                    name="collectionImageUrl" 
                    label="ImageUrl"
                    rules={[
                        {
                            type: "url",
                            required: true,
                            message: 'Please input the imageUrl of collection!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCollectionModal;