import { Table } from "antd";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../../Redux/alertsSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          `https://server-healthum.onrender.com/api/doctor/get-appointments-by-doctorId`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
  }, [dispatch, isSuccess]);

  const handleStatus = async (appointmentId, userId, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://server-healthum.onrender.com/api/doctor/approve-appointments",
        { appointmentId: appointmentId, userId: userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response && response.data.success) {
        toast.success(response.data.msg);
        setIsSuccess(!isSuccess);
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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => (
        <span className="normal_text">{record.userInfo.name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (
        <span className="normal_text">{record.userInfo.email}</span>
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
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1
            className="anchor"
            onClick={() =>
              handleStatus(record._id, record.userId, record.status)
            }
          >
            {record.status === "pending"
              ? "Approve"
              : record.status === "rejected"
              ? "Approve"
              : "Reject"}
          </h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
