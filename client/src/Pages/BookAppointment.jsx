import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../Redux/alertsSlice";
import moment from "moment";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";

const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [timing, setSelectedTiming] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const doctorByUserId = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "https://server-healthum.onrender.com/api/doctor/get-doctor-info-by-doctorId",
          {
            doctorId: doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response && response.data.success) {
          setDoctor(response.data.doctor);
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
  }, [dispatch, doctorId]);

  const bookNow = async () => {
    if (!(date || timing)) {
      return toast.error("Please select date and timings", {
        duration: 1000,
      });
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        `https://server-healthum.onrender.com/api/doctor/appointment/book-appointment`,
        {
          doctorId: doctorId,
          date,
          timing,
          userInfo: user,
          doctorInfo: doctor,
          userId: user._id,
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
        setIsAvailable(false);
        navigate("/appointments");
      }
    } catch (error) {
      dispatch(hideLoading());
      setIsAvailable(false);
      toast.error(
        error.response.data.msg ? error.response.data.msg : error.message,
        {
          duration: 1000,
        }
      );
    }
  };

  const checkAvailability = async () => {
    if (!(date || timing)) {
      return toast.error("Please select date and timings", {
        duration: 1000,
      });
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        `https://server-healthum.onrender.com/api/doctor/appointment/check-availability`,
        {
          doctorId: doctorId,
          date,
          timing,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response && response.data.success) {
        setIsAvailable(true);
        toast.success(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      setIsAvailable(false);
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
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle" justify="center">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://img.freepik.com/premium-vector/red-book-now-label-modern-style-white-background_123447-428.jpg?w=2000"
                alt="booking-img"
                width={400}
                height={400}
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal_text">
                <b>Timings : </b>
                {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p className="card_text">
                <b>Experience : </b>
                {doctor.experience} Yrs
              </p>
              <p className="card_text">
                <b>Mobile Number : </b>
                {doctor.mobileNumber}
              </p>
              <p className="card-text">
                <b>Address : </b>
                {doctor.address}
              </p>
              <p className="card-text">
                <b>Website : </b>
                {doctor.website}
              </p>
              <p className="card-text">
                <b>Fees : </b>
                {doctor.feePerConsultation} Rupees
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setSelectedTiming(moment(value).format("HH:mm"));
                  }}
                />
                {!isAvailable && (
                  <Button
                    type="primary"
                    className="mt-3"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}
                {isAvailable && (
                  <Button type="primary" className="mt-3" onClick={bookNow}>
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
