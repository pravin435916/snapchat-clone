import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AiOutlineCamera, AiOutlineLogin } from "react-icons/ai";
import {  signOut, useSession } from 'next-auth/react';
export const Navbar = () => {
  const { data: session } = useSession('')
  return (
    <header className="flex justify-between items-center bg-yellow-400 px-4 py-4 shadow-md">
      <Link href="/">
        <span className='font-bold font-serif'>My Snap</span>
      </Link>
      <div className="flex space-x-4">
        <Link href="/search">
          <Button variant="icon">
            <AiOutlineCamera className="text-2xl text-white" />
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="icon">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.467m-.467 3.333m0-6.667v8m16 4.667v-3.333m0-2v4.667m-16 4.667h8m-8-8v-4.667m16 4.667h-8m-4 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </Button>
        </Link>
          {
            session ? (
              <Button variant="outline" onClick={() => signOut()}>Logout</Button>
            ) : (           
              <Link href="/login"> 
              <Button variant="outline">Login</Button>
              </Link>
            )
          }
      </div>
    </header>
  )
}

