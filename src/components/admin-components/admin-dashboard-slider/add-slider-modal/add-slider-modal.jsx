import React, { useState }  from 'react';
import { Modal, Form, Input, Image } from 'antd';

const AddSliderModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [addSliderImageUrl, setAddSliderImageUrl] = useState("");

    return (
        <Modal
            visible={visible}
            title="Create a new slider"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel()
                setAddSliderImageUrl("")
            }}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
                    setAddSliderImageUrl("")
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
                    setAddSliderImageUrl(allValues.sliderImageUrl);
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                    {
                        required: true,
                        message: 'Please input the title of slider!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div style={{ textAlign: "center", margin: "1rem" }} >
                    <Image
                        width={200}
                        src={addSliderImageUrl ? addSliderImageUrl : "error"}
                        fallback="https://si.secda.info/usc_creativemgnt1072/wp-content/themes/koji/assets/images/default-fallback-image.png"
                    />
                </div>
                <Form.Item 
                    name="sliderImageUrl" 
                    label="ImageUrl"
                    rules={[
                        {
                            type: "url",
                            required: true,
                            message: 'Please input the imageUrl of Slider!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSliderModal;