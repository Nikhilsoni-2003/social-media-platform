import React from 'react'
import { useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import { useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setCurrentUserStory, setStoryData } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';
import { ClipLoader } from 'react-spinners';
import { setUserData } from '../redux/userSlice';
function Upload() {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState("")
    const [caption,setCaption]=useState("")
    const mediaInput = useRef()
    const dispatch=useDispatch()
    const {postData}=useSelector(state=>state.post)
     const {storyData}=useSelector(state=>state.story)
      const {loopData}=useSelector(state=>state.loop)
      const [loading,setLoading]=useState(false)
    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

const uploadPost=async ()=>{
   
    try {
        const formData=new FormData()
        formData.append("caption",caption)
        formData.append("mediaType",mediaType)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true})
       dispatch(setPostData([...postData,result.data]))
       setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}

const uploadStory=async ()=>{
    try {
        const formData=new FormData()
        formData.append("mediaType",mediaType)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/story/upload`,formData,{withCredentials:true})
       dispatch(setCurrentUserStory(result.data))
         setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}
const uploadLoop=async ()=>{
    try {
        const formData=new FormData()
        formData.append("caption",caption)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/loop/upload`,formData,{withCredentials:true})
         dispatch(setLoopData([...loopData,result.data]))
         setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}

const handleUpload = () => {
    setLoading(true)
    if (uploadType == "post") {
        uploadPost()
    } else if (uploadType == "story") {
        uploadStory()
    } else {
        uploadLoop()
    }
}

    return (
        <div className='w-full h-[100vh] bg-primary flex flex-col items-center element-gap container-padding'>
            <div className='w-full h-[70px] flex items-center element-gap glass rounded-xl container-padding'>
                <MdOutlineKeyboardBackspace className='text-primary cursor-pointer w-[24px] h-[24px] hover-bg rounded-lg p-1' onClick={() => navigate(`/`)} />
                <h1 className='text-primary text-lg font-semibold'>Upload Media</h1>
            </div>

            <div className='w-full max-w-[500px] glass rounded-full flex justify-around items-center element-gap container-padding'>
                <div className={`${uploadType == "post" ? "gradient-primary text-white" : "text-secondary hover:text-primary"} flex-1 h-10 flex justify-center items-center text-sm font-medium rounded-full cursor-pointer transition-all duration-300`} onClick={() => setUploadType("post")}>Post</div>
                <div className={`${uploadType == "story" ? "gradient-primary text-white" : "text-secondary hover:text-primary"} flex-1 h-10 flex justify-center items-center text-sm font-medium rounded-full cursor-pointer transition-all duration-300`} onClick={() => setUploadType("story")}>Story</div>
                <div className={`${uploadType == "loop" ? "gradient-primary text-white" : "text-secondary hover:text-primary"} flex-1 h-10 flex justify-center items-center text-sm font-medium rounded-full cursor-pointer transition-all duration-300`} onClick={() => setUploadType("loop")}>Loop</div>
            </div>

            {!frontendMedia && <div className='w-full max-w-[500px] h-[300px] glass border-2 border-secondary flex flex-col items-center justify-center element-gap mt-12 rounded-2xl cursor-pointer hover-lift transition-all duration-300' onClick={() => mediaInput.current.click()}>
                <input type="file" accept={uploadType == "loop" ? "video/*" : ""} hidden ref={mediaInput} onChange={handleMedia} />
                <FiPlusSquare className='text-secondary w-[32px] h-[32px]' />
                <div className='text-primary text-lg font-semibold'>Upload {uploadType}</div>
                <div className='text-secondary text-sm text-center'>Click to select {uploadType == "loop" ? "video" : "image or video"}</div>
            </div>}

            {frontendMedia &&
                <div className='w-full max-w-[500px] flex flex-col items-center element-gap mt-8'>
                    {mediaType == "image" && <div className='w-full flex flex-col items-center element-gap'>
                        <div className='glass rounded-2xl p-4'>
                            <img src={frontendMedia} alt="" className='max-h-[300px] rounded-xl' />
                        </div>
                        {uploadType != "story" && <input type='text' className='w-full glass rounded-xl container-padding outline-none text-primary placeholder-muted bg-transparent border border-secondary focus:border-blue-400 transition-all duration-300' placeholder='Write caption...' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                    </div>}

                    {mediaType == "video" && <div className='w-full flex flex-col items-center element-gap'>
                        <div className='glass rounded-2xl p-4'>
                            <VideoPlayer media={frontendMedia} />
                        </div>
                        {uploadType != "story" && <input type='text' className='w-full glass rounded-xl container-padding outline-none text-primary placeholder-muted bg-transparent border border-secondary focus:border-blue-400 transition-all duration-300' placeholder='Write caption...' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                    </div>}
                </div>}
            {frontendMedia && <button className='w-full max-w-[400px] h-12 gradient-primary text-white mt-8 cursor-pointer rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center' onClick={handleUpload}>{loading ? <ClipLoader size={24} color='white' /> : `Upload ${uploadType}`}</button>}
        </div>
    )
}

export default Upload