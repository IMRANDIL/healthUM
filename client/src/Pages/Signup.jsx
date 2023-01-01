import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertsSlice";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    if (!values.name || !values.email || !values.password) {
      return toast.error("All Fields required!", {
        duration: 1000,
      });
    }
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://server-healthum.onrender.com/api/user/signup",
        values
      );
      dispatch(hideLoading());
      if (response && response.data.success) {
        toast.success(response.data.msg);
        return navigate("/login");
      } else {
        return toast.error(response.data.msg, {
          duration: 1000,
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(
        error.response.data.msg ? error.response.data.msg : error.message,
        {
          duration: 1000,
        }
      );
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
