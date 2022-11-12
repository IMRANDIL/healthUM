import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Redux/usersSlice";
import jwt from "jwt-decode";
import axios from "axios";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
          if (response.data.success) {
            dispatch(setUser(response.data.user));
          } else {
            navigate("/login");
          }
        } catch (error) {
          dispatch(hideLoading());
          navigate("/login");
        }
      };
      getUser();
    }
  }, [user, dispatch, navigate, token]);

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
