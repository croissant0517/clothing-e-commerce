import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddActivityModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Create a new activity"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel()
            }}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
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
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                    {
                        required: true,
                        message: 'Please input the title of activity!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddActivityModal;