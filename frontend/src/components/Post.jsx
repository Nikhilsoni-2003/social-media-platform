import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import VideoPlayer from './VideoPlayer'
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import axios from 'axios';
import { serverUrl } from '../App';
import { setPostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice';
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';
function Post({ post }) {
  const { userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)
  const { socket } = useSelector(state => state.socket)
  const [showComment, setShowComment] = useState(false)
  const [message,setMessage]=useState("")
  const navigate=useNavigate()
const dispatch=useDispatch()
  const handleLike=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/post/like/${post._id}`,{withCredentials:true})
      const updatedPost=result.data

      const updatedPosts=postData.map(p=>p._id==post._id?updatedPost:p)
      dispatch(setPostData(updatedPosts))
    } catch (error) {
      console.log(error)
    }
  }

 const handleComment=async ()=>{
    try {
      const result=await axios.post(`${serverUrl}/api/post/comment/${post._id}`,{message},{withCredentials:true})
      const updatedPost=result.data

      const updatedPosts=postData.map(p=>p._id==post._id?updatedPost:p)
      dispatch(setPostData(updatedPosts))
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleSaved=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/post/saved/${post._id}`,{withCredentials:true})
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error.response)
    }
  }
  
  useEffect(()=>{
    socket?.on("likedPost",(updatedData)=>{
     const updatedPosts=postData.map(p=>p._id==updatedData.postId?{...p,likes:updatedData.likes}:p)
     dispatch(setPostData(updatedPosts))
    })
socket?.on("commentedPost",(updatedData)=>{
     const updatedPosts=postData.map(p=>p._id==updatedData.postId?{...p,comments:updatedData.comments}:p)
     dispatch(setPostData(updatedPosts))
    })

    return ()=>{socket?.off("likedPost")
               socket?.off("CommentedPost")}
  },[socket,postData,dispatch])
  return (
    <div className='w-[90%] flex flex-col element-gap glass-post items-center rounded-2xl card-spacing hover-lift fade-in-up'>
      <div className='w-full h-[70px] flex justify-between items-center container-padding'>
        <div className='flex items-center element-gap cursor-pointer hover-bg rounded-lg p-2 transition-all duration-300' onClick={()=>navigate(`/profile/${post.author?.userName}`)}>
          <div className='w-[45px] h-[45px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden hover-scale'>
            <img src={post.author?.profileImage || dp} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </div>
          <div className='font-semibold text-primary hover:text-blue-400 transition-colors duration-300'>{post.author.userName}</div>
        </div>
       {userData._id!=post.author._id &&  <FollowButton tailwind={'gradient-primary text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 px-3 py-2'} targetUserId={post.author._id}/>}
       
      </div>
      <div className='w-[90%] flex items-center justify-center'>
        {post.mediaType == "image" && <div className='w-[90%] flex items-center justify-center'>
          <img src={post.media} alt="" className='w-[80%] rounded-2xl object-cover shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]' />
        </div>}

        {post.mediaType == "video" && <div className='w-[80%] flex flex-col items-center justify-center'>
          <VideoPlayer media={post.media} />
        </div>}




      </div>

      <div className='w-full h-[50px] flex justify-between items-center container-padding'>
        <div className='flex items-center element-gap'>
          <div className='flex items-center gap-2 hover-bg rounded-lg p-2 cursor-pointer'>
            {!post.likes.includes(userData._id) && <GoHeart className='w-[22px] h-[22px] text-secondary hover:text-red-400 transition-all duration-300' onClick={handleLike}/>}
            {post.likes.includes(userData._id) && <GoHeartFill className='w-[22px] h-[22px] text-red-400 transition-all duration-300' onClick={handleLike}/>}
            <span className='font-medium text-secondary text-sm'>{post.likes.length}</span>
          </div>
          <div className='flex items-center gap-2 hover-bg rounded-lg p-2 cursor-pointer' onClick={()=>setShowComment(prev=>!prev)}>
            <MdOutlineComment className='w-[22px] h-[22px] text-secondary hover:text-blue-400 transition-all duration-300' />
            <span className='font-medium text-secondary text-sm'>{post.comments.length}</span>
          </div>
        </div>
        <div onClick={handleSaved} className='hover-bg rounded-lg p-2 cursor-pointer'>
          {!userData.saved.includes(post?._id) && <MdOutlineBookmarkBorder className='w-[22px] h-[22px] text-secondary hover:text-yellow-400 transition-all duration-300' />}
          {userData.saved.includes(post?._id) && <GoBookmarkFill className='w-[22px] h-[22px] text-yellow-400 transition-all duration-300' />}
        </div>
      </div>
      {post.caption && <div className='w-full container-padding element-gap flex justify-start items-start'>
        <h1 className='font-semibold text-primary text-sm'>{post.author.userName}</h1>
        <div className='text-secondary leading-relaxed text-sm'>{post.caption}</div>
      </div>}

      {showComment &&
        <div className='w-full flex flex-col element-gap container-padding fade-in-up'>
          <div className='w-full flex items-center element-gap glass rounded-xl container-padding'>
          <div className='w-[40px] h-[40px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden'>
            <img src={userData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
          </div>
          <input type="text" className='flex-1 px-4 py-2 border border-primary focus:border-blue-400 outline-none rounded-lg bg-card text-primary placeholder-muted transition-all duration-300' placeholder='Write comment...' onChange={(e)=>setMessage(e.target.value)} value={message}/>
          <button className='gradient-primary p-2 rounded-lg hover:shadow-lg transition-all duration-300' onClick={handleComment}><IoSendSharp className='w-[18px] h-[18px] text-white'/></button>
          </div>

          <div className='w-full max-h-[300px] overflow-auto custom-scrollbar'>
            {post.comments?.map((com,index)=>(
<div key={index} className='w-full flex items-start element-gap glass rounded-xl container-padding card-spacing hover-lift'>
   <div className='w-[35px] h-[35px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden flex-shrink-0'>
            <img src={com.author.profileImage || dp} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='flex flex-col gap-1 min-w-0'>
            <span className='font-semibold text-primary text-sm'>{com.author.userName}</span>
            <div className='text-secondary text-sm leading-relaxed break-words'>{com.message}</div>
          </div>
</div>
            ))}

          </div>

        </div>
      }



    </div>
  )
}

export default Post
