import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    if (!values.name || !values.email || !values.password) {
      return toast.error("All Fields required!");
    }
    try {
      const response = await axios.post("/api/user/signup", values);
      if (response.data.success === true) {
        toast.success(response.data.msg);
        return navigate("/login");
      } else {
        return toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
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
