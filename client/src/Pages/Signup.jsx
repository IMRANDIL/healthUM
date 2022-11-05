import React from "react";
import { Button, Form, Input } from "antd";
const Signup = () => {
  return (
    <div className="auth">
      <div className="authForm card p-4">
        <h1 className="card_title">Nice to meet u :)</h1>
        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Button className="primaryButton mt-3">SignUp</Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
