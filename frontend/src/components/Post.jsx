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
import { BsThreeDots } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
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
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const [message,setMessage]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }
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
    <div className='w-full max-w-[500px] morphing-card neon-border card-spacing relative overflow-hidden fade-in-up gpu-accelerated'>
      {/* Heart animation overlay */}
      {showHeartAnimation && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-50'>
          <FaHeart className='text-red-500 text-6xl heart-animation' />
        </div>
      )}
      
      <div className='flex items-center justify-between container-padding pb-0'>
        <div className='flex items-center element-gap'>
          <img src={post.author.profileImage} alt="" className='w-[40px] h-[40px] rounded-full object-cover border-2 border-primary premium-glow hover-lift'/>
          <div>
            <div className='text-primary font-medium text-[14px]'>{post.author.userName}</div>
            <div className='text-secondary text-[12px]'>{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <BsThreeDots className='text-secondary hover:text-primary transition-colors duration-300 cursor-pointer hover-scale hover-bg rounded-lg p-2'/>
      </div>

      {post.caption && (
        <div className='w-full container-padding pt-0'>
          <div className='text-secondary leading-relaxed text-sm'>
            <span className='font-semibold text-primary mr-2'>{post.author.userName}</span>
            {post.caption}
          </div>
        </div>
      )}

      <div className='w-full flex items-center justify-center container-padding'>
        {post.mediaType === "image" && (
          <img src={post.media} alt="" className='w-full rounded-2xl object-cover shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]' />
        )}

        {post.mediaType === "video" && (
          <div className='w-full flex flex-col items-center justify-center'>
            <VideoPlayer media={post.media} />
          </div>
        )}
      </div>

      <div className='w-full flex justify-between items-center container-padding'>
        <div className='flex items-center element-gap'>
          <div className='flex items-center gap-2 hover-bg rounded-lg p-2 cursor-pointer' onClick={() => {handleLike(); setShowHeartAnimation(true); setTimeout(() => setShowHeartAnimation(false), 1000)}}>
            {!post.likes.includes(userData._id) ? (
              <GoHeart className='w-[22px] h-[22px] text-secondary hover:text-red-400 transition-all duration-300' />
            ) : (
              <GoHeartFill className='w-[22px] h-[22px] text-red-400 transition-all duration-300' />
            )}
            <span className='font-medium text-secondary text-sm'>{post.likes.length}</span>
          </div>
          <div className='flex items-center gap-2 hover-bg rounded-lg p-2 cursor-pointer' onClick={()=>setShowComment(prev=>!prev)}>
            <MdOutlineComment className='w-[22px] h-[22px] text-secondary hover:text-blue-400 transition-all duration-300' />
            <span className='font-medium text-secondary text-sm'>{post.comments.length}</span>
          </div>
        </div>
        <div onClick={handleSaved} className='hover-bg rounded-lg p-2 cursor-pointer'>
          {!userData.saved.includes(post?._id) ? (
            <MdOutlineBookmarkBorder className='w-[22px] h-[22px] text-secondary hover:text-yellow-400 transition-all duration-300' />
          ) : (
            <GoBookmarkFill className='w-[22px] h-[22px] text-yellow-400 transition-all duration-300' />
          )}
        </div>
      </div>

      {showComment && (
        <div className='w-full flex flex-col element-gap container-padding fade-in-up'>
          <div className='w-full flex items-center element-gap glass rounded-xl container-padding'>
            <div className='w-[40px] h-[40px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden'>
              <img src={userData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
            </div>
            <input 
              type="text" 
              className='flex-1 px-4 py-2 border border-primary focus:border-blue-400 outline-none rounded-lg bg-card text-primary placeholder-muted transition-all duration-300' 
              placeholder='Write comment...' 
              onChange={(e)=>setMessage(e.target.value)} 
              value={message}
            />
            <button className='gradient-primary p-2 rounded-lg hover:shadow-lg transition-all duration-300' onClick={handleComment}>
              <IoSendSharp className='w-[18px] h-[18px] text-white'/>
            </button>
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
      )}
    </div>
  )
}

export default Post
