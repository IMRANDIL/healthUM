import React, { useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Redux/usersSlice";
import jwt from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "/api/user/getUserInfo",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response && response.data.success) {
            return dispatch(setUser(response.data.user));
          }
        } catch (error) {
          dispatch(hideLoading());
          localStorage.removeItem("token");
          navigate('/login')
          return toast.error(
            error.response.data.msg ? error.response.data.msg : error.message,
            {
              duration: 1000,
            }
          );
         
        }
      };
      getUser();
    }
  }, [user, dispatch, token]);

  const decoedToken = token && jwt(token);

  const validToken =
    decoedToken && decoedToken.exp * 1000 > new Date().getTime();
  if (!validToken) {
    localStorage.removeItem("token");
  }
  if (token && validToken) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
