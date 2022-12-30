import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from '../Redux/alertsSlice'
import moment from 'moment';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';


const BookAppointment = () => {
    const [doctor,setDoctor] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [date,setDate] = useState();
    const [selectedTiming, setSelectedTiming] = useState()
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
             setDoctor(response.data.doctor)
              
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
        {doctor && (
            <div>
 <h1 className="page-title">{doctor.firstName} {doctor.lastName}</h1>
 <hr />
<Row>
    <Col span={8} sm={24} xs={24} lg={8}>
    <h1 className="normal_text"><b>Timings : </b>{doctor.timings[0]} - {doctor.timings[1]}</h1>
 <div className="d-flex flex-column pt-2">
    <DatePicker format='DD-MM-YYYY'
    onChange={(value)=>setDate(moment(value).format('DD-MM-YYYY'))}
    />
    <TimePicker.RangePicker format='HH:mm' className='mt-3'onChange={(value)=>setSelectedTiming(moment(value).format('HH:mm'))}/>
    <Button
    type='primary'
    className='mt-3'
    >Check Availability</Button>
 </div>
    </Col>
</Row>
            </div>
           
        )}
        
    </Layout>
  )
}

export default BookAppointment