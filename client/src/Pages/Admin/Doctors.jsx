import React,{useEffect,useState} from 'react';
import Layout from '../../components/Layout';
import { setDoctors } from '../../Redux/allDoctorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import toast from "react-hot-toast";
import {showLoading,hideLoading} from '../../Redux/alertsSlice'
import { Table } from 'antd';


const Doctors = () => {


  const [pages,setPages] = useState(1);
  const [page,setPage] = useState(1);
  const [isSuccess,setIsSuccess] = useState(false)
  
    const dispatch = useDispatch();
    const {doctors} = useSelector((state)=>state.doctors);
  
  
    const onChange = (current,value)=>{
      
      setPage(value);
     
    }
  
  

    useEffect(()=>{
      const getAllDoctors = async()=>{
        try {
          dispatch(showLoading());
          const response = await axios.get(
            `/api/admin/allDoctors?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response && response.data.success) {
            setPages(response.data.pages)
            return dispatch(setDoctors(response.data.doctors));
          }
        } catch (error) {
          dispatch(hideLoading());
          return toast.error(
            error.response.data.msg ? error.response.data.msg : error.message,
            {
              duration: 1000,
            }
          );
        }
      }
      
     getAllDoctors()
    
  
    
    },[dispatch,page,isSuccess])






const handleStatus = async(doctorId,userId,status)=>{
  try {
    dispatch(showLoading());
    const response = await axios.post('/api/admin/approve-doctor',{doctorId:doctorId,userId:userId,status:status},{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(hideLoading());
    if (response && response.data.success) {
      toast.success(response.data.msg);
     setIsSuccess(!isSuccess);
     
    }
   
  } catch (error) {
    dispatch(hideLoading());
          return toast.error(
            error.response.data.msg ? error.response.data.msg : error.message,
            {
              duration: 1000,
            }
          );
  }
}





    const columns = [
      {
        title:'Name',
        dataIndex: 'name',
        render:(text,record)=> <span className='normal_text'>{record.firstName} {record.lastName}</span>
      },
      {
        title:'Specialization',
        dataIndex: 'specialization'
      },
      {
        title:'Phone',
        dataIndex:'mobileNumber'
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt'
      },
      {
title:'Status',
dataIndex:'status'
      },
      {
        title:'Action',
        dataIndex:'actions',
        render: (text,record)=>(
          <div className='d-flex'>
            <h1 className='anchor' onClick={()=>handleStatus(record._id,record.userId,record.status)}>{record.status === 'pending' ? 'Approve' : record.status === 'approved' ? 'Block' : 'Approve'}</h1>
          
          </div>
        )
    
        
      }
    ]


  return (
    <>
    <Layout>
       <div className='inputContainer'>
        <h1 className='page-title'>All Doctors:</h1>
            <input type="text" placeholder='Search Doctors Here'/>
        </div>


<Table columns={columns} dataSource={doctors}/>


    </Layout>
    {pages > 1 && (
      <div className="pagination_container">
    <Stack spacing={2}>
      <Pagination count={pages} page={page}  onChange={onChange}/>
      </Stack>
  </div>
    )}
    </>
  )
}

export default Doctors