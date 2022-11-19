import React from "react";
import Layout from "../components/Layout";
import { Button, Row, Col, Form, Input, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertsSlice";
const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleFinish = async (values) => {
    if (
      !values.firstName ||
      !values.lastName ||
      !values.mobileNumber ||
      !values.website ||
      !values.address ||
      !values.specialization ||
      !values.experience ||
      !values.feePerConsultation ||
      !values.timings
    ) {
      return toast.error("All Fields required!", {
        duration: 1000,
      });
    }
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/apply-doctor-account", {
        ...values,
        userId: user._id,
      });
      dispatch(hideLoading());
      if (response && response.data.success) {
        toast.success(response.data.msg);
        return navigate("/");
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
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <Form layout="vertical" onFinish={handleFinish}>
        <h1 className="card_title">Personal Info :)</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="Mobile Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Website"
              name="website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Website" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card_title">Professional Info :)</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Consultaion Fee"
              name="feePerConsultation"
              rules={[{ required: true }]}
            >
              <Input placeholder="Consultation Fee" type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="primaryButton" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
