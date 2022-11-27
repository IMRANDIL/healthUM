import React,{useEffect} from 'react';
import Layout from '../../components/Layout';
import { setUsers } from '../../Redux/allUsersSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast";
import {showLoading,hideLoading} from '../../Redux/alertsSlice'



const Users = () => {

  const dispatch = useDispatch();
  const {users} = useSelector((state)=>state.users)
useEffect(()=>{
if(!users){
  const getAllUsers = async()=>{
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/admin/allUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response && response.data.success) {
        return dispatch(setUsers(response.data.users));
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
}


},[dispatch,users])


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