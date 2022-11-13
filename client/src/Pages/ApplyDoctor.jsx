import React from "react";
import Layout from "../components/Layout";
import { Button, Row, Col, Form, Input } from "antd";
const ApplyDoctor = () => {
  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <Form layout="vertical">
        <Row>
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
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
