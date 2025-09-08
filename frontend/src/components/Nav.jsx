import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[70px] glass flex justify-around items-center rounded-full shadow-2xl gentle-glow' style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999}}>
      <div onClick={()=>navigate("/")} className='hover-bg rounded-full p-2 cursor-pointer hover-lift'><GoHomeFill className='text-primary w-[24px] h-[24px]'/></div>
     <div onClick={()=>navigate("/search")} className='hover-bg rounded-full p-2 cursor-pointer hover-lift'><FiSearch className='text-primary w-[24px] h-[24px]'/></div>
     <div onClick={()=>navigate("/upload")} className='hover-bg rounded-full p-2 cursor-pointer hover-lift'><FiPlusSquare className='text-primary w-[24px] h-[24px]'/></div>
     <div onClick={()=>navigate("/loops")} className='hover-bg rounded-full p-2 cursor-pointer hover-lift'><RxVideo className='text-primary w-[26px] h-[26px]'/></div>
     <div className='w-[40px] h-[40px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden hover-scale pulse-animation' onClick={()=>navigate(`/profile/${userData.userName}`)}>
         <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
     </div>
    </div>
  )
}

export default Nav
