import React from 'react'
import LeftHome from '../components/LeftHome'
import Feed from '../components/Feed'
import RightHome from '../components/RightHome'

function Home() {
  return (
    <div className='w-full min-h-[100vh] animated-bg particle-bg flex gpu-accelerated smooth-scroll'>
      <LeftHome />
      <Feed />
      <RightHome />
    </div>
  )
}

export default Home
