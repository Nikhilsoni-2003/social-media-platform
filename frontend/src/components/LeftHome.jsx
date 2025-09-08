import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { FaRegHeart } from "react-icons/fa6";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';
import Notifications from '../pages/Notifications';
function LeftHome() {

    const {userData ,suggestedUsers}=useSelector(state=>state.user)
    const [showNotification,setShowNotification]=useState(false)
const dispatch=useDispatch()
const {notificationData}=useSelector(state=>state.user)
    const handleLogOut=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className={`w-[25%] hidden lg:block h-[100vh] glass-sidebar border-r border-primary ${showNotification?"overflow-hidden":"overflow-auto custom-scrollbar"} relative overflow-hidden`}>
      {/* Subtle background animation */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 right-4 w-2 h-2 bg-blue-400 rounded-full message-bubble-1 opacity-5'></div>
        <div className='absolute top-40 left-6 w-1 h-1 bg-purple-400 rounded-full message-bubble-2 opacity-8' style={{animationDelay: '3s'}}></div>
        <div className='absolute top-72 right-8 w-1.5 h-1.5 bg-green-400 rounded-full message-bubble-3 opacity-6' style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className='w-full h-[60px] flex items-center justify-between container-padding glass-header relative z-10 fade-in-left'>
        <img src={logo} alt="" className='w-[60px] hover-scale transition-transform duration-300' style={{filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'}} />
        <div className='relative z-[100] hover-scale cursor-pointer hover-bg rounded-lg p-2 neon-border' onClick={()=>setShowNotification(prev=>!prev)}>
          <FaRegHeart className='text-primary w-[20px] h-[20px] hover:text-blue-400 transition-colors duration-300'/>
          {notificationData?.length>0 && notificationData.some((noti)=>noti.isRead===false) && (
            <div className='w-[6px] h-[6px] bg-blue-500 rounded-full absolute top-1 right-1 pulse-animation'></div>
          )}
        </div>
      </div>

      {!showNotification && <>
        <div className='flex items-center w-65 my-4 justify-between element-gap container-padding glass rounded-2xl mx-13 hover-lift'>
          <div className='flex items-center element-gap'>
            <div className='w-[50px] h-[50px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden hover-scale'>
              <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
            </div>
            <div>
              <div className='text-[14px] text-primary font-semibold'>{userData.userName}</div>
              <div className='text-[11px] text-secondary font-medium'>{userData.name}</div>
            </div>
          </div>
          <button 
            className='gradient-secondary text-white font-medium cursor-pointer px-3 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover-scale text-xs'
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>

        <div className='w-full flex flex-col container-padding'>
          <div className='glass rounded-2xl p-4'>
            <h1 className='text-primary text-[16px] font-semibold mb-3 flex items-center element-gap'>
              <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
              Suggested Users
            </h1>
            <div className='flex flex-col element-gap'>
              {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
                <OtherUser key={index} user={user}/>
              ))}
            </div>
          </div>
        </div>
      </>}

      {showNotification && <Notifications/>}
    </div>
  )
}

export default LeftHome