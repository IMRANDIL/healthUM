import React,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout";
import Doctor from "../components/Doctor";




const Home = () => {
  const dispatch = useDispatch()
const [doctors,setDoctors] = useState([])
const token = localStorage.getItem("token");
useEffect(()=>{
const fetchApprovedDoctors = async()=>{
  try {
    dispatch(showLoading());
    const response = await axios.get(
      "/api/user/get-all-approved-doctors",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(hideLoading());
    if (response && response.data.success) {
      return setDoctors(response.data.approvedDoctors);
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
}
fetchApprovedDoctors()
},[dispatch,token])



  return (
    <Layout>
      <h1>Home Page</h1>
      {doctors && doctors.map((doctor)=>(
        <Doctor key={doctor._id} doctor={doctor}/>
      ))}
    </Layout>
  );
};

export default Home;
