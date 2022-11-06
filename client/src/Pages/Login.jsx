import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Login = () => {
  const handleFinish = (values) => {
    console.log("value of form ", values);
  };

  return (
    <div className="auth">
      <div className="authForm card p-4">
        <h1 className="card_title">Nice to meet u :)</h1>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primaryButton mt-3" htmlType="submit">
            Login
          </Button>
          <Link to="/signup" className="anchor">
            Click here to Signup
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
