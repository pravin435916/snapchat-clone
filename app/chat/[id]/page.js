import { getProfileUser } from '@/app/api/chat/users/route'
import ChatPage from '@/app/components/ChatPage'
import React from 'react'

const page = async ({ params }) =>{
  const userProfile = await getProfileUser(params.id)
  return (
    <ChatPage userProfile={userProfile}/>
  )
}

export default page