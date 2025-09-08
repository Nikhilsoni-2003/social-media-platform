import React from 'react'
import logo from "../assets/logo.png"
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from './StoryDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import { BiMessageAltDetail } from "react-icons/bi";
import Post from './Post';
import { useNavigate } from 'react-router-dom';
function Feed() {
  const {postData}=useSelector(state=>state.post)
    const {userData,notificationData}=useSelector(state=>state.user)
     const {storyList,currentUserStory}=useSelector(state=>state.story)
     const navigate=useNavigate()
  return (
    <div className='w-full md:w-[40%] lg:w-[50%] bg-primary min-h-[100vh] md:h-[100vh] relative md:overflow-y-auto custom-scrollbar pb-16 md:pb-0'>
        <div className='w-full h-[60px] flex items-center justify-between container-padding md:hidden glass-header'>
              <img src={logo} alt="" className='w-[60px] hover-scale' style={{filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'}} />
              <div className='flex items-center element-gap'>
            <div className='relative hover-scale hover-bg rounded-lg p-2' onClick={()=>navigate("/notifications")}>
                 <FaRegHeart className='text-primary w-[20px] h-[20px] hover:text-blue-400 transition-colors duration-300'/>
                 {notificationData?.length>0 && notificationData.some((noti)=>noti.isRead===false) && (<div className='w-[6px] h-[6px] bg-blue-500 rounded-full absolute top-1 right-1 pulse-animation'></div>)}
                   </div>
            <BiMessageAltDetail className='text-primary w-[20px] h-[20px] hover:text-green-400 transition-colors duration-300 hover-scale hover-bg rounded-lg p-2' onClick={()=>navigate("/messages")}/>
              </div>
            </div>

            <div className='flex w-full justify-start overflow-x-auto element-gap items-center container-padding custom-scrollbar py-2 relative gpu-accelerated'>
              {/* Enhanced floating elements in story section */}
              <div className='absolute top-2 right-4 w-1 h-1 bg-blue-400 rounded-full message-bubble-1 opacity-10'></div>
              <div className='absolute bottom-2 left-8 w-0.5 h-0.5 bg-purple-400 rounded-full message-bubble-2 opacity-15' style={{animationDelay: '2s'}}></div>
              <div className='absolute top-6 left-12 w-0.5 h-0.5 bg-pink-400 rounded-full message-bubble-3 opacity-12' style={{animationDelay: '4s'}}></div>
              
              <div className='stagger-1'>
                <StoryDp userName={"Your Story"} ProfileImage={userData.profileImage} story={currentUserStory}/>
              </div>
              {storyList?.map((story,index)=>(
                <div key={index} className={`stagger-${Math.min(index + 2, 4)}`}>
                  <StoryDp userName={story.author.userName} ProfileImage={story.author.profileImage} story={story}/>
                </div>
              ))}
            </div>

<div className='w-full min-h-[100vh] flex flex-col items-center element-gap container-padding pt-2 animated-bg particle-bg rounded-t-1xl relative pb-32 border-t border-primary gpu-accelerated smooth-scroll'>
{postData && postData.map((post,index)=>(
  <div key={index} className={`fade-in-up stagger-${Math.min(index + 1, 4)}`}>
    <Post post={post}/>
  </div>
))}
</div>
<Nav/>

    </div>
  )
}

export default Feed
