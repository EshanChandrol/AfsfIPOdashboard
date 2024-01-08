import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const Login = () => {
  const [form] = Form.useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      // Compare password with stored hash
      const isMatch = await bcrypt.compare(values.password, storedPassword);

      if (isMatch && values.username === storedUsername) { // Ensure username also matches
        setIsLoggedIn(true);
        message.success('Login successful!');
        navigate("/");
      } else {
        message.error('Invalid username or password');
      }
    } else {
      message.error('User not found');
    }
  };

  return (
    <div className="login-container">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
