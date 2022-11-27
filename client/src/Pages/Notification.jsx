import React from 'react'
import Layout from '../components/Layout';
import {Tabs} from 'antd';
import {setUser} from '../Redux/usersSlice'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../Redux/alertsSlice';
import axios from 'axios';


const Notification = () => {

  const {user} = useSelector(state=>state.user)
const navigate = useNavigate();
const dispatch = useDispatch()

const markAllAsSeen = async()=>{
  try {
    dispatch(showLoading());
    const response = await axios.post("/api/user/mark-all-notifications-seen", {userId: user._id},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(hideLoading());
    if (response && response.data.success) {
     toast.success(response.data.msg);
     return dispatch(setUser(response.data.updatedUser))
    } else {
      return toast.error(response.data.msg, {
        duration: 1000,
      });
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



  return (
   <Layout>
    <h1 className="page-title">Notifications</h1>
    <Tabs>
      <Tabs.TabPane tab='Unseen' key={0}>
<div className="d-flex justify-content-end">
  {user && user.unseenNotifications.lenght >= 1 &&
  <h1 className="anchor" onClick={markAllAsSeen}>Mark all as seen</h1>}
</div>
{user && user.unseenNotifications.map((notification,index)=>(
  <div className='card p-2' onClick={()=>navigate(notification.onClickPath)} key={index}>
    <div className="card-text">
      {notification.msg}
    </div>
  </div>
))}
      </Tabs.TabPane>

      <Tabs.TabPane tab='Seen' key={1}>
<div className="d-flex justify-content-end">
  <h1 className="anchor">Delete all seen</h1>
</div>
{user && user.seenNotifications.map((notification,index)=>(
  <div className='card p-2' onClick={()=>navigate(notification.onClickPath)} key={index}>
    <div className="card-text">
      {notification.msg}
    </div>
  </div>
))}
      </Tabs.TabPane>
    </Tabs>
   </Layout>
  )
}

export default Notification