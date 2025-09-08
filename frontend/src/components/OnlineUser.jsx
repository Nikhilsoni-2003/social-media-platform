import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedUser } from '../redux/messageSlice'
import dp from "../assets/dp.webp"
function OnlineUser({user}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  return (
    <div className='w-[50px] h-[50px] flex justify-start items-center relative'>
      <div className='w-[50px] h-[50px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden hover-scale transition-all duration-300' onClick={()=>{
        dispatch(setSelectedUser(user))
        navigate(`/messageArea`)
      }}>
                <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover'/>
            </div>
<div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-0 right-0 border-2 border-card'>
</div>
    </div>
  )
}

export default OnlineUser
