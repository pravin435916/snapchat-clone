import React, { Children } from 'react'
import LeftSlideBar from '../components/LeftSlideBar'

function layout({children}) {
  return (
    <div className='flex h-screen'>
      <LeftSlideBar/> 
      {children}
    </div>
  )
}

export default layout