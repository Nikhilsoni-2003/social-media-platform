import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaRegHeart, FaPlus } from "react-icons/fa"
import { BiMessageAltDetail } from "react-icons/bi"
import { FiSearch } from "react-icons/fi"
import { useSelector } from 'react-redux'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { notificationData } = useSelector(state => state.user)

  const navItems = [
    { icon: FaHome, path: '/', label: 'Home' },
    { icon: FiSearch, path: '/search', label: 'Search' },
    { icon: FaPlus, path: '/create', label: 'Create' },
    { icon: FaRegHeart, path: '/notifications', label: 'Notifications', hasNotification: notificationData?.length > 0 && notificationData.some(noti => noti.isRead === false) },
    { icon: BiMessageAltDetail, path: '/messages', label: 'Messages' }
  ]

  return (
    <div className='fixed bottom-0 left-0 right-0 h-16 bg-primary border-t border-primary glass-header md:hidden z-50'>
      <div className='flex items-center justify-around h-full container-padding'>
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <div 
              key={index}
              className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover-scale cursor-pointer ${
                isActive ? 'text-blue-400' : 'text-primary hover:text-blue-400'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className='w-5 h-5 mb-1' />
              <span className='text-xs font-medium'>{item.label}</span>
              
              {item.hasNotification && (
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full pulse-animation'></div>
              )}
              
              {isActive && (
                <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full'></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
