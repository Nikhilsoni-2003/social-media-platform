import React from 'react'
import Messages from '../pages/Messages'

function RightHome() {
  return (
    <div className='w-[25%] min-h-[100vh] glass-sidebar border-l border-primary hidden lg:block relative overflow-hidden'>
      {/* Floating Message Bubbles Background Animation */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-8 w-4 h-4 bg-blue-400 rounded-full message-bubble-1 opacity-10'></div>
        <div className='absolute top-32 right-12 w-3 h-3 bg-green-400 rounded-full message-bubble-2 opacity-15'></div>
        <div className='absolute top-48 left-16 w-5 h-5 bg-purple-400 rounded-full message-bubble-3 opacity-8'></div>
        <div className='absolute top-64 right-6 w-2 h-2 bg-yellow-400 rounded-full message-bubble-1 opacity-12' style={{animationDelay: '2s'}}></div>
        <div className='absolute top-80 left-4 w-3 h-3 bg-pink-400 rounded-full message-bubble-2 opacity-10' style={{animationDelay: '4s'}}></div>
        <div className='absolute top-96 right-20 w-4 h-4 bg-indigo-400 rounded-full message-bubble-3 opacity-15' style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className='w-full h-[60px] flex items-center container-padding glass-header relative z-10'>
        <h2 className='text-primary text-[16px] font-semibold flex items-center element-gap'>
          <span className='w-2 h-2 bg-green-500 rounded-full pulse-animation'></span>
          Messages
        </h2>
      </div>
      <div className='relative z-10'>
        <Messages/>
      </div>
    </div>
  )
}

export default RightHome
