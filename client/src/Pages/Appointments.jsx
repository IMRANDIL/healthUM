import { Table } from "antd";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(`/api/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response && response.data.success) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
        return toast.error(
          error.response.data.msg ? error.response.data.msg : error.message,
          {
            duration: 1000,
          }
        );
      }
    };

    getAppointmentsData();
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span className="normal_text">
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      render: (text, record) => (
        <span className="normal_text">{record.doctorInfo.specialization}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      render: (text, record) => (
        <span className="normal_text">{record.doctorInfo.mobileNumber}</span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span className="normal_text">
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.timing).format("HH:mm")}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
