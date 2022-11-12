import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
const Home = () => {
  const getUserInfo = async () => {
    try {
      const response = await axios.post(
        "/api/user/getUserInfo",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      toast.error(
        error.response.data.msg ? error.response.data.msg : error.message
      );
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default Home;
