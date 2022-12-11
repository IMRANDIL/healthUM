import React,{useEffect,useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from '../../Redux/alertsSlice'
import DoctorForm from '../../components/DoctorForm';
import Layout from '../../components/Layout'

const Profile = () => {

  const [doctor,setDoctor] = useState(null)
const dispatch = useDispatch();
const {user} = useSelector((state)=>state.user);
const navigate = useNavigate()
const {userId} = useSearchParams()


const handleFinish = async(values)=>{

}



 


  useEffect(()=>{
    const doctorByUserId = async () => {
   
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/doctor/get-doctor-info-by-userId",
          {
           
            userId: user.id,
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
  },[dispatch,user])


  return (
  <Layout>
<h1 className="page-title">Doctor Profile</h1>
<hr/>
<DoctorForm handleFinish={handleFinish} initialValues={doctor}/>
  </Layout>
  )
}

export default Profile