import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import dp from "../assets/dp.webp"
function Search() {
    const navigate=useNavigate()
    const[input,setInput]=useState("")
    const [searchDataState,setSearchDataState]=useState([])
    const dispatch=useDispatch()
    const handleSearch=async ()=>{
     
        try {
            const keyWord=input.trim()
            if(!keyWord){
                setSearchDataState([])
                dispatch(setSearchData([]))
                return
            }
            const result=await axios.get(`${serverUrl}/api/user/search?keyWord=${keyWord}`,{withCredentials:true})
           setSearchDataState(result.data)
           dispatch(setSearchData(result.data))
        } catch (error) {
            console.log(error)
            setSearchDataState([])
            dispatch(setSearchData([]))
        }
    }

    useEffect(()=>{
        handleSearch()
    },[input])
    console.log(searchDataState)
  return (
    <div className='w-full min-h-[100vh] bg-primary flex items-center flex-col element-gap container-padding'>
       <div className='w-full h-[70px] flex items-center element-gap glass rounded-xl container-padding'>
                      <MdOutlineKeyboardBackspace className='text-primary cursor-pointer w-[24px] h-[24px] hover-bg rounded-lg p-1' onClick={() => navigate(`/`)} />
                      <h1 className='text-primary text-lg font-semibold'>Search</h1>
                  </div>
                  
                  <div className='w-full flex items-center justify-center'>
                    <div className='w-full max-w-[600px] glass rounded-xl flex items-center element-gap container-padding'>
                      <FiSearch className='w-[20px] h-[20px] text-secondary'/>
                      <input
                      type="text"
                      placeholder='Search users...'
                      className='flex-1 outline-0 bg-transparent text-primary placeholder-muted text-base'
                      onChange={(e)=>setInput(e.target.value)}
                      value={input}
                      />
                    </div>
                  </div>
                  
   {input && searchDataState?.map((user)=>(
<div key={user._id || user.userName} className='w-full max-w-[600px] glass rounded-xl flex items-center element-gap container-padding cursor-pointer hover-lift transition-all duration-300' onClick={()=>navigate(`/profile/${user.userName}`)}>
<div className='w-[50px] h-[50px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden flex-shrink-0'>
          <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover'/>
      </div>

      <div className='flex-1 min-w-0'>
        <div className='text-primary text-base font-semibold'>{user.userName}</div>
        <div className='text-sm text-secondary'>{user.name}</div>
      </div>
      </div>
))}   

{!input && <div className='text-2xl text-secondary font-semibold text-center mt-12'>Search for users...</div>}
    </div>
  )
}

export default Search
