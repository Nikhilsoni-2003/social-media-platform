import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom'
import FollowButton from './FollowButton'
function OtherUser({user}) {
    const {userData}=useSelector(state=>state.user)
    const navigate=useNavigate()
  return (
    <div className='w-full flex items-center justify-between glass rounded-xl container-padding hover-lift transition-all duration-300' >
       <div className='flex items-center element-gap'>
      <div className='w-[45px] h-[45px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden hover-scale' onClick={()=>navigate(`/profile/${user.userName}`)}>
          <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover'/>
      </div>
      <div>
          <div className='text-[14px] text-primary font-semibold'>{user.userName}</div>
          <div className='text-[12px] text-secondary font-medium'>{user.name}</div>
      </div>
      </div>
      
      <FollowButton tailwind={'px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300'} targetUserId={user._id}/>
     
    </div>
  )
}

export default OtherUser
