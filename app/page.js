'use client'
import Users from "./components/users"
import { useSession } from "next-auth/react";
import Home from "./components/Home";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";
export default function Component() {
  const router = useRouter();
  const { data: session } = useSession('')
  if(!session) {
    router.push('/login')
  }
  return (
    <>
    <Navbar/>
    <Home/>
      {/* {
        session && (
          <Home/>
        )
      } */}
    </>
  )
}