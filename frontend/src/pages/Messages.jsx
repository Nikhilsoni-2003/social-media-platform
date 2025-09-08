import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import OnlineUser from '../components/OnlineUser';
import { setSelectedUser } from '../redux/messageSlice';
import dp from "../assets/dp.webp"
function Messages() {
    const navigate=useNavigate()
    const {userData}=useSelector(state=>state.user)
     const {onlineUsers}=useSelector(state=>state.socket)
      const {prevChatUsers,selectedUsers}=useSelector(state=>state.message)
const dispatch=useDispatch()
  return (
    <div className='w-full min-h-[100vh] flex flex-col bg-primary element-gap container-padding'>
       <div className='w-full h-[70px] flex items-center element-gap glass rounded-xl container-padding'>
                      <MdOutlineKeyboardBackspace className='text-primary cursor-pointer lg:hidden w-[24px] h-[24px] hover-bg rounded-lg p-1' onClick={() => navigate(`/`)} />
                      <h1 className='text-primary text-lg font-semibold'>Messages</h1>
                  </div>

                  {/* <div className='w-full flex element-gap justify-start items-center overflow-x-auto container-padding glass rounded-xl'>
{userData.following?.map((user,index)=>(
  (onlineUsers?.includes(user._id)) && <OnlineUser key={index} user={user}/>
))}
                  </div> */}

        <div className='w-full h-full overflow-auto flex flex-col element-gap'>
{prevChatUsers?.map((user,index)=>(
  <div key={index} className='cursor-pointer w-full flex items-center element-gap glass rounded-xl container-padding hover-lift transition-all duration-300' onClick={()=>{
dispatch(setSelectedUser(user))
navigate("/messageArea")
  }}>

{onlineUsers?.includes(user._id)? <OnlineUser user={user}/>: <div className='w-[50px] h-[50px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden'>
          <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover'/>
      </div>
      }
      <div className='flex flex-col'>
<div className='text-primary text-base font-semibold'>{user.userName}</div>
{onlineUsers?.includes(user?._id) && <div className='text-blue-400 text-sm'>Active Now</div>}
</div>
  </div>
))}

          </div>          

    </div>
  )
}

export default Messages
