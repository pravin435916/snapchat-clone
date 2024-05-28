'use client'
import React from 'react'
import Users from './users'
import { CiSearch } from 'react-icons/ci'
import { AiOutlineLogout } from 'react-icons/ai'
import {Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'

function LeftSlideBar() {
    const { data: session } = useSession();
  return (
    <div className="relative w-[26vw] m-2 border-solid border-black border shadow-md rounded-lg p-2">
    <header className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100">
      <div className='flex gap-4 items-center'>
        <Avatar>
          <AvatarImage src={`${session?.user.image || "https://github.com/shadcn.png"} `} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">{session?.user.name}</h1>
      </div>
      <div className='flex items-center justify-center w-10 h-10 rounded-full p-2 bg-black cursor-pointer'>
        <AiOutlineLogout className=" text-2xl   text-white" onClick={()=> signOut()} />
      </div>
    </header>
    <hr />
    {/* searchbar */}
    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100 mt-4 gap-2">
        <span><CiSearch /></span>
        <input type="search" name="search" id="search" placeholder='search or start a new chat ' className='w-full bg-transparent outline-none' />
    </div>
    <div className=" py-4 px-2">
      <Users />
    </div>
  </div>
  )
}

export default LeftSlideBar