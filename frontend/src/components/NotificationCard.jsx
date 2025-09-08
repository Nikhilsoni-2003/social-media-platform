import React from 'react'
import dp from "../assets/dp.webp"
function NotificationCard({noti}) {

    
  return (
    <div className='w-full flex justify-between items-center glass rounded-xl container-padding hover-lift transition-all duration-300'>
    <div className='flex element-gap items-center'>
        <div className='w-[45px] h-[45px] border-2 border-secondary rounded-full cursor-pointer overflow-hidden'>
                 <img src={noti.sender.profileImage || dp} alt="" className='w-full h-full object-cover'/>
             </div> 
             <div className='flex flex-col'>
                <h1 className='text-base text-primary font-semibold'>{noti.sender.userName}</h1>
                <div className='text-sm text-secondary'>{noti.message}</div>
             </div>
    </div>
    <div className='w-[45px] h-[45px] rounded-lg overflow-hidden border-2 border-secondary'>

        {noti.loop
        ?
        <video src={noti?.loop?.media} muted  className='h-full w-full object-cover'/>
        :
        noti.post?.mediaType=="image"?
        <img src={noti.post?.media} className='h-full w-full object-cover'/>
        :
        noti.post?
        <video src={noti.post?.media} muted loop className='h-full w-full object-cover'/>
        :
        null}

    </div>
    </div>
  )
}

export default NotificationCard
