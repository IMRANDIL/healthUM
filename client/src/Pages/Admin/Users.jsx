import React,{useEffect} from 'react';
import Layout from '../../components/Layout';
import { setUser } from '../../Redux/usersSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast";
import {showLoading,hideLoading} from '../../Redux/alertsSlice'



const Users = () => {

  const dispatch = useDispatch()

useEffect(()=>{

const getAllUsers = async()=>{
  try {
    dispatch(showLoading());
    const response = await axios.get(
      "/api/admin/allUsers",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch(hideLoading());
    if (response && response.data.success) {
      return dispatch(setUser(response.data.user));
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

getAllUsers()

},[dispatch])


  return (
    <Layout>
       
        <div className='inputContainer'>
        <h1 className='page-title'>All Users:</h1>
            <input type="text" placeholder='Search Users Here'/>
        </div>
    </Layout>
  )
}

export default Users