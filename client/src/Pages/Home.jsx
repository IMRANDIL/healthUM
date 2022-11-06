import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <div>Home</div>;
};

export default Home;
