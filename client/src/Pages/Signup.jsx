import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const handleFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/signup", values);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="auth">
      <div className="authForm card p-4">
        <h1 className="card_title">Nice to meet u :)</h1>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primaryButton mt-3" htmlType="submit">
            SignUp
          </Button>
          <Link to="/login" className="anchor">
            Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
