import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    if (!values.email || !values.password) {
      return toast.error("All Fields required!");
    }
    try {
      const response = await axios.post("/api/user/login", values);
      if (response.data.success === true) {
        toast.success(response.data.msg);
        return navigate("/");
      } else {
        return toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="auth">
      <div className="authForm card p-4">
        <h1 className="card_title">Welcome Back :)</h1>
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
