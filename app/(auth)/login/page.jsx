'use client'
import Login from '@/app/components/login'
import React from 'react'
import { signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { Navbar } from '@/app/components/Navbar'
const page = () => {
    const signUphandler = async (provider) => {
        // 'use server'
        await signIn(provider);
    }
  return (
    <>
    <Navbar/>
    <form action={signUphandler}>
        <Login/>
    </form>
    </>
  )
}
export default page