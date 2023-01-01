import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../Redux/alertsSlice";
import DoctorForm from "../../components/DoctorForm";
import Layout from "../../components/Layout";
import moment from "moment";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(
        "https://server-healthum.onrender.com/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: userId,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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

  useEffect(() => {
    const doctorByUserId = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "https://server-healthum.onrender.com/api/doctor/get-doctor-info-by-userId",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response && response.data.success) {
          setDoctor(response.data.user);
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
    doctorByUserId();
  }, [dispatch, userId]);

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor && (
        <DoctorForm handleFinish={handleFinish} initialValues={doctor} />
      )}
    </Layout>
  );
};

export default Profile;
