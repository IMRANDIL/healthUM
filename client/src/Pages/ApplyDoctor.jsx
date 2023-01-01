import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertsSlice";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";
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
      const response = await axios.post(
        "https://server-healthum.onrender.com/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
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

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm handleFinish={handleFinish} />
    </Layout>
  );
};

export default ApplyDoctor;
