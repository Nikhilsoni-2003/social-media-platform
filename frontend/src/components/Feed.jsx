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
    <div className='lg:w-[50%] w-full bg-primary min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto custom-scrollbar'>
        <div className='w-full h-[60px] flex items-center justify-between container-padding lg:hidden glass-header'>
              <img src={logo} alt="" className='w-[60px] hover-scale'/>
              <div className='flex items-center element-gap'>
            <div className='relative hover-scale hover-bg rounded-lg p-2' onClick={()=>navigate("/notifications")}>
                 <FaRegHeart className='text-primary w-[20px] h-[20px] hover:text-blue-400 transition-colors duration-300'/>
                 {notificationData?.length>0 && notificationData.some((noti)=>noti.isRead===false) && (<div className='w-[6px] h-[6px] bg-blue-500 rounded-full absolute top-1 right-1 pulse-animation'></div>)}
                   </div>
            <BiMessageAltDetail className='text-primary w-[20px] h-[20px] hover:text-green-400 transition-colors duration-300 hover-scale hover-bg rounded-lg p-2' onClick={()=>navigate("/messages")}/>
              </div>
            </div>

            <div className='flex w-full justify-start overflow-x-auto element-gap items-center container-padding custom-scrollbar py-2 relative'>
              {/* Subtle floating elements in story section */}
              <div className='absolute top-2 right-4 w-1 h-1 bg-blue-400 rounded-full message-bubble-1 opacity-10'></div>
              <div className='absolute bottom-2 left-8 w-0.5 h-0.5 bg-purple-400 rounded-full message-bubble-2 opacity-15' style={{animationDelay: '2s'}}></div>
              
<StoryDp userName={"Your Story"} ProfileImage={userData.profileImage} story={currentUserStory}/>
{storyList?.map((story,index)=>(
<StoryDp userName={story.author.userName} ProfileImage={story.author.profileImage} story={story} key={index}/>
))}
            </div>

<div className='w-full min-h-[100vh] flex flex-col items-center element-gap container-padding pt-2 bg-secondary rounded-t-1xl relative pb-32 border-t border-primary'>
<Nav/>
{postData && postData.map((post,index)=>(
  <Post post={post} key={index}/>
))}
</div>

    </div>
  )
}

export default Feed
