import React from 'react';
import { Form, Input, Button, message } from 'antd';
import bcrypt from 'bcryptjs';
import Icon, { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link , useNavigate} from 'react-router-dom';


const Registration = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(values.password, 10);

        // Store credentials in browser's local storage (for demo purposes)
        localStorage.setItem('username', values.username);
        localStorage.setItem('email', values.email);
        localStorage.setItem('password', hashedPassword);

        message.success('Registration successful!');
        navigate("/login");
    };

    return (
        <div>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label=""
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label=""
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label=""
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;
