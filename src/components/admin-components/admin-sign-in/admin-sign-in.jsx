import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../api/api-utils';

import "./admin-sign-in.scss";

const AdminSignIn = ({setCurrentAdmin}) => {
    const [ errorMessage, setErrorMessage ] = useState('');

    const saveAuthTokenInSession = (token) => {
        window.localStorage.setItem("token", token)
    }

    const onFinish = (values) => {
        const { username, password } = values;
        axios({
            method: "POST",
            url: `${API_URL}/admin/signin`,
            headers: { "Content-Type": "application/json" },
            data: {
                username: username,
                password: password,
            },
        })
        .then((res) => {
            if (res.data.user && res.data.success === "true") {
                setCurrentAdmin(res.data.user)
                saveAuthTokenInSession(res.data.token)
                message.success("Success Sign in")
            }
        })
        .catch((error) => {
            message.error("Fail Sign in")
            if (error.response.data) {
                setErrorMessage(error.response.data)
            } else {
                return
            }
        })
    };

    return (
        <div className='admin-signin-container' >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onValuesChange={() => setErrorMessage("")}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <div style={{ textAlign: "center", margin: "1rem", color: "red" }} >
                    {errorMessage}
                </div>
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminSignIn;