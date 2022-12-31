import { Table } from "antd";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
