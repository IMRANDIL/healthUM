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

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
