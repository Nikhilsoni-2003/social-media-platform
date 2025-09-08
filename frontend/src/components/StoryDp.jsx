import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
function StoryDp({ProfileImage,userName,story}) {
const navigate=useNavigate()
const{ userData}=useSelector(state=>state.user)
const{ storyData,storyList}=useSelector(state=>state.story)
const [viewed,setViewed]=useState(false)
useEffect(()=>{
  if(story?.viewers?.some((viewer)=>
  viewer?._id?.toString()===userData._id.toString() || viewer?.toString()==userData._id.toString()
)){
  setViewed(true)
}else{
  setViewed(false)
}


},[story,userData,storyData,storyList])
const handleViewers=async ()=>{
  try {
    const result=await axios.get(`${serverUrl}/api/story/view/${story._id}`,{withCredentials:true})
    
  } catch (error) {
    console.log(error)
  }
}


const handleClick=()=>{
  if(!story && userName=="Your Story"){
    navigate("/upload")
  }else if(story && userName=="Your Story"){
      handleViewers()
    navigate(`/story/${userData?.userName}`)
 
  }else {
     handleViewers()
navigate(`/story/${userName}`)
  }
}
  return (
    <div className='flex flex-col w-[75px] hover-scale'>
      <div className={`w-[70px] h-[70px] ${!story?'gradient-primary':!viewed?"gradient-success":"gradient-secondary"} rounded-full flex items-center justify-center relative hover-lift transition-all duration-300 cursor-pointer`}  onClick={handleClick}>
      <div className='w-[60px] h-[60px] border-2 border-white rounded-full cursor-pointer overflow-hidden'>
          <img src={ProfileImage ||  dp} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'/>
          {!story && userName=="Your Story" && <div>
       <FiPlusCircle className='text-blue-500 absolute bottom-[6px] bg-white right-[6px] rounded-full w-[20px] h-[20px] shadow-md hover:scale-110 transition-transform duration-300' />
            </div>}
               
      </div>
      </div>
      <div className='text-[12px] text-center truncate w-full text-secondary font-medium mt-2'>{userName}</div>
    </div>
  )
}

export default StoryDp