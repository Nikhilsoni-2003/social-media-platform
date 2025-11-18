import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post'
import { useState } from 'react'
import { setSelectedUser } from '../redux/messageSlice'

function Profile() {

    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postType,setPostType]=useState("posts")
    const { profileData, userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    const handleProfile = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])
    return (
        <div className='w-full min-h-screen bg-primary'>
            <div className='w-full h-[70px] flex justify-between items-center container-padding glass'>
                <div onClick={() => navigate("/")} className='hover-bg rounded-lg p-2 cursor-pointer'>
                    <MdOutlineKeyboardBackspace className='text-primary w-[24px] h-[24px]' />
                </div>
                <div className='font-semibold text-lg text-primary'>{profileData?.userName}</div>
                <div className='font-medium cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 hover-bg rounded-lg px-3 py-2' onClick={handleLogOut}>Log Out</div>
            </div>

            <div className='w-full flex items-start element-gap pt-6 container-padding justify-center'>
                <div className='w-[80px] h-[80px] md:w-[120px] md:h-[120px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden'>
                    <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='flex-1 max-w-md'>
                    <div className='font-semibold text-xl text-primary'>{profileData?.name}</div>
                    <div className='text-sm text-secondary mt-1'>{profileData?.profession || "New User"}</div>
                    <div className='text-sm text-secondary mt-1'>{profileData?.bio}</div>
                </div>
            </div>

            <div className='w-full flex items-center justify-center gap-8 md:gap-12 container-padding pt-6'>
                <div className='text-center'>
                    <div className='text-primary text-xl md:text-2xl font-semibold'>{profileData?.posts.length}</div>
                    <div className='text-sm md:text-base text-secondary'>Posts</div>
                </div>
                <div className='text-center'>
                    <div className='flex items-center justify-center element-gap'>
                        <div className='flex relative'>
                            {profileData?.followers?.slice(0, 3).map((user, index) => (
                                <div key={index} className={`w-[35px] h-[35px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden ${index > 0 ? 'ml-[-8px]' : ''}`}>
                                    <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                </div>
                            ))}
                        </div>
                        <div className='text-primary text-xl md:text-2xl font-semibold'>
                            {profileData?.followers.length}
                        </div>
                    </div>
                    <div className='text-sm md:text-base text-secondary'>Followers</div>
                </div>
                <div className='text-center'>
                    <div className='flex items-center justify-center element-gap'>
                        <div className='flex relative'>
                            {profileData?.following?.slice(0, 3).map((user, index) => (
                                <div key={index} className={`w-[35px] h-[35px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden ${index > 0 ? 'ml-[-8px]' : ''}`}>
                                    <img src={user?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                </div>
                            ))}
                        </div>
                        <div className='text-primary text-xl md:text-2xl font-semibold'>
                            {profileData?.following.length}
                        </div>
                    </div>
                    <div className='text-sm md:text-base text-secondary'>Following</div>
                </div>
            </div>

            <div className='w-full flex justify-center items-center element-gap container-padding pt-6'>
                {profileData?._id == userData._id &&
                    <button className='px-6 py-2 bg-card text-primary border border-primary hover:bg-primary hover:text-white cursor-pointer rounded-lg font-medium transition-all duration-300' onClick={() => navigate("/editprofile")}>Edit Profile</button>}

                {profileData?._id != userData._id &&
                    <>
                        <FollowButton tailwind={'px-6 py-2 bg-card text-primary border border-primary hover:bg-primary hover:text-white cursor-pointer rounded-lg font-medium transition-all duration-300'} targetUserId={profileData?._id} onFollowChange={handleProfile} />
                        <button className='px-6 py-2 gradient-primary text-white cursor-pointer rounded-lg font-medium hover:shadow-lg transition-all duration-300' onClick={() => {
                            dispatch(setSelectedUser(profileData))
                            navigate("/messageArea")
                        }}>Message</button>
                    </>
                }
            </div>

            <div className='w-full min-h-[100vh] flex justify-center pt-6'>
                <div className='w-full max-w-[900px] flex flex-col items-center glass rounded-t-3xl relative element-gap container-padding pb-24'>
                    {profileData?._id == userData._id && <div className='w-[90%] max-w-[400px] glass rounded-full flex justify-center items-center element-gap container-padding'>
                        <div className={`${postType == "posts" ? "gradient-primary text-white" : "text-secondary hover:text-primary"} flex-1 h-10 flex justify-center items-center text-sm font-medium rounded-full cursor-pointer transition-all duration-300`} onClick={() => setPostType("posts")}>Posts</div>
                        <div className={`${postType == "saved" ? "gradient-primary text-white" : "text-secondary hover:text-primary"} flex-1 h-10 flex justify-center items-center text-sm font-medium rounded-full cursor-pointer transition-all duration-300`} onClick={() => setPostType("saved")}>Saved</div>
                    </div>}

{profileData?._id==userData._id && <>
                   { postType=="posts" && postData
                   .filter((post)=>post.author?._id==profileData?._id)
                   .map((post)=>(
    <Post key={post._id} post={post}/>
))}
{postType=="saved" && postData
.filter((post)=>userData.saved.includes(post._id))
.map((post)=>(
    <Post key={post._id} post={post}/>
))}
</> 
}
{profileData?._id!=userData._id &&
                   postData
                   .filter((post)=>post.author?._id==profileData?._id)
                   .map((post)=>(
    <Post key={post._id} post={post}/>
))
}

                </div>
            </div>
            <Nav />
        </div>
    )
}

export default Profile
