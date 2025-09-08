import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import axios from 'axios';
import { serverUrl } from '../App';
import getAllNotifications from '../hooks/getAllNotifications';
import { setNotificationData } from '../redux/userSlice';
function Notifications() {
    const navigate=useNavigate()
    const {notificationData}=useSelector(state=>state.user)
    const ids=notificationData.map((n)=>n._id)
    const dispatch=useDispatch()
    const markAsRead=async ()=>{
        try {
            const result=await axios.post(`${serverUrl}/api/user/markAsRead`,{notificationId:ids},{withCredentials:true})
          await fetchNotifications()
        } catch (error) {
            console.log(error)
        }
    }
const fetchNotifications=async ()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/user/getAllNotifications`,{withCredentials:true})
         dispatch(setNotificationData(result.data))
    } catch (error) {
        console.log(error)
    }
}
    

    useEffect(()=>{
    markAsRead()
   
    },[])
  return (
    <div className='w-full h-[100vh] bg-primary overflow-auto'>
       <div className='w-full h-[70px] flex items-center element-gap container-padding lg:hidden glass'>
                      <MdOutlineKeyboardBackspace className='text-primary cursor-pointer w-[24px] h-[24px] hover-bg rounded-lg p-1' onClick={() => navigate(`/`)} />
                      <h1 className='text-primary text-lg font-semibold'>Notifications</h1>
                  </div>

                  <div className='w-full flex flex-col element-gap container-padding'>
{notificationData?.map((noti,index)=>(
    <NotificationCard noti={noti} key={index}/>
))}
                  </div>
    </div>
  )
}

export default Notifications
