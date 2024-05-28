'use client'
import { SessionProvider } from "next-auth/react"
import { Navbar } from "./Navbar"

export const SessionWrapper = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
