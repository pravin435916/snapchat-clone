import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { BsCameraReels } from 'react-icons/bs'

function ChatPage({ userProfile }) {

    return (
        <div className='w-full m-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage src={`${userProfile.photo || "https://github.com/shadcn.png"} `} alt="@shadcn" />
                        <AvatarFallback>{userProfile.fullName}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-xl'>{userProfile.fullName}</span>
                        <span className='text-xs'>@{userProfile.username}</span>
                    </div>
                </div>
                <Button>Clear Chat</Button>
            </div>
            {/* chatscreeen */}
            <div className='w-full h-[82vh] border-4 rounded-lg'></div>
            {/* input */}
            <div className='w-full flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 "><AiOutlineCamera  className='text-2xl'/></div>
                    <input type="text" className='w-[60vw] rounded-full p-2 outline-none border' placeholder='enter message'/>
                </div>
                <div className='flex gap-2 items-center'>
                <Button>Send Snap</Button>
                <div className="flex items-center bg-black text-white justify-center rounded-full w-10 h-10 "><AiOutlineCamera  className='text-2xl'/></div>
                </div>
                
            </div>
        </div>
    )
}

export default ChatPage