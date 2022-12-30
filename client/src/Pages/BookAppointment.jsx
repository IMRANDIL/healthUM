import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from '../Redux/alertsSlice'

const BookAppointment = () => {
    const [doctor,setDoctor] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {doctorId} = useParams()
   





    useEffect(()=>{
        const doctorByUserId = async () => {
       
          try {
            dispatch(showLoading());
            const response = await axios.post(
              "/api/doctor/get-doctor-info-by-doctorId",
              {
               
                doctorId: doctorId
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (response && response.data.success) {
             setDoctor(response.data.user)
              
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
       doctorByUserId()
      },[dispatch,doctorId])



  return (
    <Layout>
        <div className="page-title">{doctor.firstName} {doctor.lastName}</div>
    </Layout>
  )
}

export default BookAppointment